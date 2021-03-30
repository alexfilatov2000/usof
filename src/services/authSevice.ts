import {loginSchema, registerSchema, remindPswByEmail, resetSchema} from "../lib/joi/joiShemaAuth";
import {
    findUserByEmail,
    findUserById,
    findUserByLogin,
    saveNewUser,
    setHashPassword,
    verifyPassword,
    updateUserPswById, updateUserStatusById,
} from '../models/authModels';
import jwt from "jsonwebtoken";
import {config} from "../config";
import {getVerifyURL, verifyTemplate} from "../lib/mail/verifyEmailMail";
import {transporter} from "../lib/mail/transporter";
import {User} from "../entity/user";
import {getPasswordResetURL, resetPasswordTemplate} from "../lib/mail/resetMail";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export const registerService = {
    saveUser: async (bodyData) => {
        const { error } = registerSchema.validate(bodyData);

        if (error) {
            throw new Error(error.message);
        } else if (await findUserByLogin(bodyData.login)) {
            throw new Error('Login is already exist');
        } else if (await findUserByEmail(bodyData.email)) {
            throw new Error('Email is already exist');
        } else {
            const hash = await setHashPassword(bodyData.password);
            return await saveNewUser(bodyData.full_name, bodyData.login, bodyData.email, hash);
        }
    },
    sendMail: async (user) => {
        const token = jwt.sign({ user }, config.token.verifyEmailToken);
        const url = getVerifyURL(token);
        const emailTemplate = verifyTemplate(user, url);
        await transporter.sendMail(emailTemplate);
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export const loginService = {
    checkUser: async (bodyData) => {
        const { error } = loginSchema.validate(bodyData);

        if (error) {
            throw new Error(error.message);
        }
        if (!(await findUserByLogin(bodyData.login))) {
            throw new Error('Login is not found');
        }
        const user = await findUserByLogin(bodyData.login)
        if (!(await verifyPassword(user.password, bodyData.password))){
            throw new Error('Invalid password');
        }
        if (!user.isVerified){
            throw new Error('You should verify your email first');
        }
        return user;
    },
    generateAccessToken: (user: { user: User }): string => {
        return jwt.sign(user, config.token.accessToken, {
            expiresIn: '1h',
        });
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export const pswResetService = {
    checkUser: async (bodyData) => {
        const { error } = remindPswByEmail.validate(bodyData);

        if (error) {
            throw new Error(error.message);
        }
        const user = await findUserByEmail(bodyData.email)
        if (!user) {
            throw new Error('No user with that email');
        } else if (!user.isVerified) {
            throw new Error('You should verify your email first');
        } else {
            return user;
        }
    },
    sendMail: async (user) => {
        const token = jwt.sign({ id: user.id }, config.token.resetToken, { expiresIn: '1h' });
        const url = getPasswordResetURL(token);
        const emailTemplate = resetPasswordTemplate(user, url);
        await transporter.sendMail(emailTemplate);
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export const receiveNewPswService = {
    verifyToken: async (token) => {
        try {
            return jwt.verify(token, config.token.resetToken);
        } catch (err) {
            throw new Error('Time is over');
        }
    },
    updateUser: async (bodyData, id) => {
        const { error } = resetSchema.validate(bodyData);
        if (error) throw new Error(error.message);

        const user = await findUserById(id);
        const hash = await setHashPassword(bodyData.password);

        return await updateUserPswById(user.id, hash)
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export const verifyEmailService = {
    verifyToken: async (token) => {
        try {
            return jwt.verify(token, config.token.verifyEmailToken);
        } catch (err) {
            throw new Error('Wrong token');
        }
    },
    updateUserStatus: async (bodyData, id) => {

        const user = await updateUserStatusById(id)

    }
}

