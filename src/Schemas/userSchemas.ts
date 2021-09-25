import Joi from 'joi';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const newUserSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().regex(emailRegex).required(),
    password: Joi.string().required(),
    name: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string()
})

export const updateUserSchema = Joi.object({
    id: Joi.string(),
    userName: Joi.string(),
    email: Joi.string().regex(emailRegex),
    name: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string()
})