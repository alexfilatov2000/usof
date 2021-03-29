import { registerSchema, resetSchema, loginSchema, remindPswByEmail } from '../joi/joiShemaAuth';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { User } from '../../entity/user';
import { sendErr } from '../interfaces/userInterface';

export const registerVal = (bodyData: User, findByEmailObj: User, findByLoginObj: User): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = registerSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else if (findByEmailObj) {
        newErr.status = 400;
        newErr.body = { error: 'Email is already exist' };
        return newErr;
    } else if (findByLoginObj) {
        newErr.status = 400;
        newErr.body = { error: 'Login is already exist' };
        return newErr;
    } else {
        return newErr;
    }
};

export const loginVal = async (bodyData: User, findByLoginObj: User): Promise<sendErr> => {
    const newErr = { status: 200, body: {} };
    const { error } = loginSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else if (!findByLoginObj) {
        newErr.status = 400;
        newErr.body = { error: 'Login is not found' };
        return newErr;
    } else if (!(await argon2.verify(findByLoginObj.password, bodyData.password))) {
        newErr.status = 400;
        newErr.body = { error: 'Invalid password' };
        return newErr;
    } else if (!findByLoginObj.isVerified) {
        newErr.status = 400;
        newErr.body = { error: 'You should verify your email first' };
        return newErr;
    } else {
        return newErr;
    }
};

export const pswResetVal = (bodyData: User, findByEmailObj: User): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = remindPswByEmail.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else if (!findByEmailObj) {
        newErr.status = 400;
        newErr.body = { error: 'No user with that email' };
        return newErr;
    } else if (!findByEmailObj.isVerified) {
        newErr.status = 400;
        newErr.body = { error: 'You should verify your email first' };
        return newErr;
    } else {
        return newErr;
    }
};

export const recNewPswVal = (bodyData: User, token: string): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = resetSchema.validate(bodyData);

    try {
        jwt.verify(token, config.token.resetToken);
    } catch (err) {
        newErr.status = 400;
        newErr.body = { error: 'Time is over' };
        return newErr;
    }
    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else {
        return newErr;
    }
};
