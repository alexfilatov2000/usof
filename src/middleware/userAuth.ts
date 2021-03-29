import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Context } from 'koa';

export const auth = async (ctx: Context, next: () => Promise<void>): Promise<void | number> => {
    const authHeader = ctx.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return (ctx.status = 401);

    try {
        const data: any = await jwt.verify(token, config.token.accessToken);
        if (data.user.isVerified === true) {
            ctx.request.body.userByToken = data.user;
            await next();
        } else {
            ctx.body = 'You should verify your email firstly';
            ctx.status = 401;
            return;
        }
    } catch (e) {
        ctx.throw(400, e);
    }
};
