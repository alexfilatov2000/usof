import Joi from 'joi';

export const createPostSchema = Joi.object({
    title: Joi.string().min(4).required(),
    content: Joi.string().min(10).required(),
    categories: Joi.string().required(),
    userByToken: Joi.any(),
});

export const createCommentSchema = Joi.object({
    content: Joi.string().min(10).required(),
    userByToken: Joi.any(),
});

export const createLikeSchema = Joi.object({
    type: Joi.string().valid('like', 'dislike'),
    userByToken: Joi.any(),
});