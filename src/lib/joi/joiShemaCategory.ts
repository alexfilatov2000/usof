import Joi from 'joi';

export const createCategorySchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(10),
});

export const updateCategorySchema = Joi.object({
    title: Joi.string().min(4),
    description: Joi.string().min(10),
});
