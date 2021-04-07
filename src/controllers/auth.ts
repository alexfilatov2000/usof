import { Context } from 'koa';
import * as auth from '../services/authSevice'

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default class UserController {
    public static async register(ctx: Context): Promise<void> {
        try {
            //save user
            const user = await auth.registerService.saveUser(ctx.request.body);
            //send email verification
            await auth.registerService.sendMail(user);
            ctx.status = 201;
            ctx.body = user;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async login(ctx: Context): Promise<void> {
        try {
            //check user
            const user = await auth.loginService.checkUser(ctx.request.body);
            const token = auth.loginService.generateAccessToken({ user });
            ctx.body = { user, token };
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async passwordReset(ctx: Context): Promise<void> {
        try {
            //check user
            const user = await auth.pswResetService.checkUser(ctx.request.body);
            //send mail
            await auth.pswResetService.sendMail(user);
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async receiveNewPassword(ctx: Context): Promise<void> {
        try {
            //check token
            const token = await auth.receiveNewPswService.verifyToken(ctx.params.token);
            //update user
            await auth.receiveNewPswService.updateUser(ctx.request.body, token.id);
            ctx.body = { msg: 'Your password has been saved' };
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async verifyEmail(ctx: Context): Promise<void> {
        try {
            //check token
            const token = await auth.verifyEmailService.verifyToken(ctx.params.token);
            //update user status to Verified(isVerified = true)
            await auth.verifyEmailService.updateUserStatus(ctx.request.body, token.user.id);
            ctx.body = { msg: 'email successfully verified!' };
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
