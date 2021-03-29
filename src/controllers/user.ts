import { Context } from 'koa';
import argon2 from 'argon2';
import { getManager, Repository, getConnection } from 'typeorm';
import { User } from '../entity/user';
import { createUserVal, updateUserVal } from '../lib/validation/userValidation';

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default class UserController {
    public static async getAllUsers(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const allUsers = await userRepository.find();
        if (!allUsers) {
            ctx.status = 400;
            ctx.body = { error: 'No user found' };
            return;
        } else {
            ctx.status = 200;
            ctx.body = allUsers;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async getUserById(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { id } = ctx.params;
        const user = await userRepository.findOne(id);
        if (!user) {
            ctx.status = 400;
            ctx.body = { error: 'No user found' };
            return;
        } else {
            ctx.status = 200;
            ctx.body = user;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async createUser(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { full_name, email, login, password, role } = ctx.request.body;

        const findByEmailObj = await userRepository.findOne({ email });
        const findByLoginObj = await userRepository.findOne({ login });

        const validation = createUserVal(ctx.request.body, findByEmailObj, findByLoginObj);

        if (validation.status === 200) {
            // Hash password
            const hash = await argon2.hash(password);
            // build up entity user to be saved
            const userToBeSaved: User = new User();
            userToBeSaved.full_name = full_name;
            userToBeSaved.login = login;
            userToBeSaved.email = email;
            userToBeSaved.role = role;
            userToBeSaved.password = hash;
            // Create a new user
            try {
                const user = await userRepository.save(userToBeSaved);
                ctx.status = 201;
                ctx.body = user;
            } catch (e) {
                //check for: invalid input value for enum users_role_enum
                ctx.status = 400;
                ctx.body = { error: e.message };
            }
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async setAvatar(ctx: Context): Promise<void> {
        try {
            ctx.status = 200;
        } catch (e) {
            ctx.status = 400;
            ctx.body = e.message;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async updateUserData(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { id } = ctx.params;
        if (!(await userRepository.findOne(id))) {
            ctx.status = 400;
            return;
        }
        const { full_name, email, login, password } = ctx.request.body;

        const findByEmailObj = await userRepository.findOne({ email });
        const findByLoginObj = await userRepository.findOne({ login });

        const validation = updateUserVal(ctx.request.body, findByEmailObj, findByLoginObj);

        if (validation.status === 200) {
            const hash = await argon2.hash(password);

            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ full_name, email, login, password: hash })
                .where('id = :id', { id: id })
                .execute();

            ctx.status = 200;
            ctx.body = await userRepository.findOne(id);
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async deleteUser(ctx: Context): Promise<void> {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { id } = ctx.params;
        if (!(await userRepository.findOne(id))) {
            ctx.status = 400;
            return;
        }
        await userRepository.delete(id);
        ctx.status = 200;
    }
}
