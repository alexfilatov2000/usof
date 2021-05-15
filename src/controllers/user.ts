import { Context } from 'koa';
import {
    getAllUsersService,
    getOneUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    addImageService,
} from '../services/userService';

export default class UserController {
    /* ===|===|===|===|===| get '/api/users/' |===|===|===|===|===|===|===| */

    public static async getAllUsers(ctx: Context): Promise<void> {
        try {
            //get all users
            ctx.body = await getAllUsersService();
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===| get '/api/users/:id' |===|===|===|===|===|===|===| */

    public static async getUserById(ctx: Context): Promise<void> {
        try {
            //get specified user by id
            ctx.body = await getOneUserService(ctx.params.id);
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===| post '/api/users' |===|===|===|===|===|===|===| */

    public static async createUser(ctx: Context): Promise<void> {
        try {
            //create new user (only admin has access!)
            ctx.body = await createUserService(ctx.request.body);
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===| post '/api/users/avatar' |===|===|===|===|===|===|===| */

    public static async setAvatar(ctx: Context): Promise<void> {
        try {
            if (!ctx.file) throw new Error('Only .png, .jpg and .jpeg format allowed!');
            await addImageService(ctx.file.filename, ctx.userByToken);
            ctx.body = ctx.file.filename;
        } catch (e) {
            ctx.status = 400;
            ctx.body = e.message;
        }
    }

    /* ===|===|===|===|===| patch '/api/users/:id' |===|===|===|===|===|===|===| */
    //todo: come up with better logic
    public static async updateUserData(ctx: Context): Promise<void> {
        try {
            //update user (only admin has access?)
            ctx.body = await updateUserService(ctx.request.body, ctx.params.id);
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    /* ===|===|===|===|===| delete '/api/users/:id' |===|===|===|===|===|===|===| */

    public static async deleteUser(ctx: Context): Promise<void> {
        try {
            //delete user by id
            await deleteUserService(ctx.params.id);
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }
}
