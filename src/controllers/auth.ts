import { Context } from 'koa';
import {
    loginService,
    pswResetService,
    registerService,
    receiveNewPswService,
    verifyEmailService,
} from '../services/authSevice';

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default class UserController {
    public static async register(ctx: Context): Promise<void> {
        try {
            //save user
            const user = await registerService.saveUser(ctx.request.body);
            //send email verification
            await registerService.sendMail(user);
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
            const user = await loginService.checkUser(ctx.request.body);
            const token = loginService.generateAccessToken({ user });
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
            const user = await pswResetService.checkUser(ctx.request.body);
            //send mail
            await pswResetService.sendMail(user);
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
            const token: any = await receiveNewPswService.verifyToken(ctx.params.token);
            //update user
            await receiveNewPswService.updateUser(ctx.request.body, token.id);
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
            const token: any = await verifyEmailService.verifyToken(ctx.params.token);
            //update user status to Verified(isVerified = true)
            await verifyEmailService.updateUserStatus(ctx.request.body, token.user.id);
            ctx.body = { msg: 'email successfully verified!' };
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }
}

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
