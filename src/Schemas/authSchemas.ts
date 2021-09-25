import Joi from 'joi';

export const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
}).required()

export const authorizationSchema = Joi.object({
    token: Joi.string().required()
}).required()