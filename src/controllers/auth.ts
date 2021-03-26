import { Context } from 'koa';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { getManager, Repository, getConnection } from 'typeorm';
import { User } from '../entity/user';
import { registerSchema, loginSchema, remindPswByEmail, resetSchema } from '../lib/validation';
import { config } from '../config';
import { resetPasswordTemplate, getPasswordResetURL } from '../lib/mail';

export default class UserController {
    public static async register(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { full_name, email, login, password } = ctx.request.body;
        // Validate a data before we a user
        const { error } = registerSchema.validate(ctx.request.body);
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
            userToBeSaved.password = hash;
            // Create a new user
            const user = await userRepository.save(userToBeSaved);
            ctx.status = 201;
            ctx.body = user;
        }
    }
    public static async login(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { login, password } = ctx.request.body
        // Check if tables exists
        // Validate a data before we a user
        const { error } = loginSchema.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.message };
        }
        // Checking if the email exists
        const user: User | undefined = await userRepository.findOne({ login });
        if (!user) {
            ctx.status = 400;
            ctx.body = { error: 'Login is not found' };
            return;
        }
        // Password is correct
        const validPass = await argon2.verify(user.password, password);
        if (!validPass) {
            ctx.status = 400;
            ctx.body = { error: 'Invalid password' };
            return;
        }
        const accessToken = generateAccessToken({ user });

        ctx.status = 200;
        ctx.body = {
            user,
            accessToken,
        };
    }

    public static async passwordReset(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        const { error } = remindPswByEmail.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.message };
            return;
        }

        const { email } = ctx.request.body;
        const user: User | undefined = await userRepository.findOne({ email: email });

        if (!user) {
            ctx.status = 400;
            ctx.body = { error: 'No user with that email' };
            return;
        }

        const token = jwt.sign({ _id: user.id }, config.token.resetToken, { expiresIn: '1h' });
        const url = getPasswordResetURL(token);
        const emailTemplate = resetPasswordTemplate(user, url);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.email,
                pass: config.mail.password,
            },
        });
        await transporter.sendMail(emailTemplate);
        ctx.status = 200;
    }

    public static async receiveNewPassword(ctx: Context): Promise<void> {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const { token } = ctx.params;
        const { password } = ctx.request.body;
        // Token Validation
        try {
            jwt.verify(token, config.token.resetToken);
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: 'Time is over' };
            return;
        }
        // Password Validation
        const { error } = resetSchema.validate(ctx.request.body);
        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.message };
            return;
        }

        const payload = jwt.decode(token, process.env.RESET_TOKEN_SECRET);
        const user: User | undefined = await userRepository.findOne({ id: payload._id });
        if (!user) {
            ctx.status = 400;
            ctx.body = { error: 'Something wrong' };
            return;
        } else {
            const hash = await argon2.hash(password);

            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ password: hash })
                .where('id = :id', { id: user.id })
                .execute();

            ctx.body = {
                user,
                msg: 'Your password has been saved',
            };
        }
    }
}

const generateAccessToken = (user: { user: User }): Promise<string> => {
    return jwt.sign(user, config.token.accessToken, {
        expiresIn: '1h',
    });
};
