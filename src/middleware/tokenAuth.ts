import jwt from 'jsonwebtoken';
import {config} from "../config";

export const authToken = async (ctx, next) => {
    const authHeader = ctx.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return ctx.status = 401;

    try {
        ctx.request.body.token = await jwt.verify(token, config.token.accessToken);
        await next();
    } catch (e) {
        ctx.throw(400, e);
    }

}