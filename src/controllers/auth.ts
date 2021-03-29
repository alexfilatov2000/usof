import { Context } from 'koa';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { getManager, Repository, getConnection } from 'typeorm';
import { User } from '../entity/user';
import { config } from '../config';
import { resetPasswordTemplate, getPasswordResetURL } from '../lib/mail/resetMail';
import { getVerifyURL, verifyTemplate } from '../lib/mail/verifyEmailMail';
import { transporter } from '../lib/mail/transporter';
import { registerVal, loginVal, pswResetVal, recNewPswVal } from '../lib/validation/authValidation';

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default class UserController {
    public static async register(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { full_name, email, login, password } = ctx.request.body;

        const findByEmailObj = await userRepository.findOne({ email });
        const findByLoginObj = await userRepository.findOne({ login });
        const validation = registerVal(ctx.request.body, findByEmailObj, findByLoginObj);

        if (validation.status === 200) {
            const hash = await argon2.hash(password);
            // build up entity user to be saved
            const userToBeSaved: User = new User();
            userToBeSaved.full_name = full_name;
            userToBeSaved.login = login;
            userToBeSaved.email = email;
            userToBeSaved.password = hash;
            // Create a new user
            const user = await userRepository.save(userToBeSaved);
            //Send verification link to user
            const token = jwt.sign({ user }, config.token.verifyEmailToken);
            const url = getVerifyURL(token);
            const emailTemplate = verifyTemplate(user, url);
            await transporter.sendMail(emailTemplate);

            ctx.status = 201;
            ctx.body = { user, token };
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async login(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { login } = ctx.request.body;
        const user: User | undefined = await userRepository.findOne({ login });

        const validation = await loginVal(ctx.request.body, user);

        if (validation.status === 200) {
            const accessToken = generateAccessToken({ user });

            ctx.status = 200;
            ctx.body = { user, accessToken };
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async passwordReset(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { email } = ctx.request.body;
        const user: User | undefined = await userRepository.findOne({ email });

        const validation = pswResetVal(ctx.request.body, user);

        if (validation.status === 200) {
            const token = jwt.sign({ _id: user.id }, config.token.resetToken, { expiresIn: '1h' });
            const url = getPasswordResetURL(token);
            const emailTemplate = resetPasswordTemplate(user, url);

            await transporter.sendMail(emailTemplate);
            ctx.status = 200;
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async receiveNewPassword(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { token } = ctx.params;
        const { password } = ctx.request.body;
        const validation = recNewPswVal(ctx.request.body, token);

        if (validation.status === 200) {
            const payload: any = jwt.verify(token, config.token.resetToken);
            const user: User | undefined = await userRepository.findOne({ id: payload._id });

            const hash = await argon2.hash(password);
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ password: hash })
                .where('id = :id', { id: user.id })
                .execute();

            ctx.body = { user, msg: 'Your password has been saved' };
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async verifyEmail(ctx: Context): Promise<void> {
        const { token } = ctx.params;
        try {
            const data: any = await jwt.verify(token, config.token.verifyEmailToken);
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ isVerified: true })
                .where('id = :id', { id: data.user.id })
                .execute();
            ctx.status = 200;
            ctx.body = 'email successfully verified!';
        } catch (e) {
            ctx.throw(400, e);
        }
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

const generateAccessToken = (user: { user: User }): string => {
    return jwt.sign(user, config.token.accessToken, {
        expiresIn: '1h',
    });
};
