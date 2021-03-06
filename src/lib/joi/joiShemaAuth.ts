import Joi from 'joi';

export const registerSchema = Joi.object({
    full_name: Joi.string().min(6).required(),
    login: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
});

export const loginSchema = Joi.object({
    login: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
});

export const remindPswByEmail = Joi.object({
    email: Joi.string().min(6).required().email(),
});

export const resetSchema = Joi.object({
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
});

export const createUserSchema = Joi.object({
    full_name: Joi.string().min(6).required(),
    login: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    role: Joi.string().valid('user', 'admin').required(),
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
    userByToken: Joi.any(),
});

export const updateUserSchema = Joi.object({
    full_name: Joi.string().min(6).required(),
    login: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userByToken: Joi.any(),
});

export const updateFullNameSchema = Joi.object({
    full_name: Joi.string().min(6).required(),
});

export const updateLoginSchema = Joi.object({
    login: Joi.string().min(4).required(),
});

export const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
});

