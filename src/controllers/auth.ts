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
import {loginService, pswResetService, registerService} from "../services/authSevice";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default class UserController {
    public static async register(ctx: Context): Promise<void> {
        try {
            //save user
            let user = await registerService.saveUser(ctx.request.body);
            //send email verification
            await registerService.sendMail(user);
            ctx.status = 201;
            ctx.body = user;
        } catch (err){
            ctx.status = 400;
            ctx.body = {error: err.message}
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async login(ctx: Context): Promise<void> {
        try{
            //check user
            const user = await loginService.checkUser(ctx.request.body);
            const token = loginService.generateAccessToken({user});
            ctx.body = {user, token}
        } catch (err) {
            ctx.status = 400;
            ctx.body = {error: err.message}
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async passwordReset(ctx: Context): Promise<void> {
        try{
            //check user
            const user = await pswResetService.checkUser(ctx.request.body);
            //send mail
            await pswResetService.sendMail(user);
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
            ctx.body = {error: err.message}
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
