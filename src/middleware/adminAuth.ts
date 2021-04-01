import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Context } from 'koa';

export const adminAuth = async (ctx: Context, next: () => Promise<void>): Promise<any> => {
    const authHeader = ctx.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return (ctx.status = 401);

    try {
        const data: any = await jwt.verify(token, config.token.accessToken);
        if (data.user.role === 'admin') {
            ctx.request.body.userByToken = data;
            await next();
        } else {
            return (ctx.status = 401);
        }
    } catch (e) {
        ctx.throw(400, e);
    }
};
