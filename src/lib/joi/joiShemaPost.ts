import Joi from 'joi';

export const createPostSchema = Joi.object({
    title: Joi.string().min(4).required(),
    content: Joi.string().min(10).required(),
});

export const createCommentSchema = Joi.object({
    content: Joi.string().min(10).required(),
});

export const createLikeSchema = Joi.object({
    type: Joi.string().valid('like', 'dislike'),
});

export const updatePostSchema = Joi.object({
    title: Joi.string().min(4),
    content: Joi.string().min(10),
    categories: Joi.array(),
});
