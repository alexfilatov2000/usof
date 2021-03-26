import { Context } from 'koa';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { getManager, Repository, getConnection } from 'typeorm';
import { User } from '../entity/user';
import { createUserSchema, resetSchema } from '../lib/validation';
import { config } from '../config';


export default class UserController {
    public static async getAllUsers(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        let allUsers = await userRepository.find()
        if (!allUsers){
            ctx.status = 400;
            ctx.body = { error: 'No user found' };
            return;
        } else {
            ctx.status = 200;
            ctx.body = allUsers;
        }
    }

    public static async getUserById(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { id } = ctx.params;
        let user = await userRepository.findOne(id);
        if (!user){
            ctx.status = 400;
            ctx.body = { error: 'No user found' };
            return;
        } else {
            ctx.status = 200;
            ctx.body = user;
        }
    }

    public static async createUser(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { full_name, email, login, password, role } = ctx.request.body;
        // Validate a data before we a user
        const { error } = createUserSchema.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.message };
        } else if (await userRepository.findOne({ email })) {
            // Checking if the user is already in the database
            ctx.status = 400;
            ctx.body = { error: 'Email is already exist' };
        } else if (await userRepository.findOne({ login })) {
            // Checking if the user is already in the database
            ctx.status = 400;
            ctx.body = { error: 'Login is already exist' };
        } else {
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
            try{
                const user = await userRepository.save(userToBeSaved);
                ctx.status = 201;
                ctx.body = user;
            } catch (e){
                //check for: invalid input value for enum users_role_enum
                ctx.status = 400;
                ctx.body = { error: e.message};
            }
        }
    }

    public static async setAvatar(ctx: Context): Promise<void> {
        try {
            ctx.status = 200;
        } catch (e) {
            ctx.status = 400
            ctx.body = e.message;
        }
    }

    public static async updateUserData(ctx: Context): Promise<any> {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { id } = ctx.params
        const {full_name, email, login, password} = ctx.request.body;

        const { error } = createUserSchema.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.message };
        } else if (await userRepository.findOne({ email })) {
            // Checking if the user is already in the database
            ctx.status = 400;
            ctx.body = { error: 'Email is already exist' };
        } else if (await userRepository.findOne({ login })) {
            // Checking if the user is already in the database
            ctx.status = 400;
            ctx.body = { error: 'Login is already exist' };
        } else {
            // Hash password
            const hash = await argon2.hash(password);

            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ full_name, email, login, password: hash })
                .where('id = :id', { id: id })
                .execute();
        }
    }

}