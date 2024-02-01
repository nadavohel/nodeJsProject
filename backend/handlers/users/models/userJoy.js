const Joi = require('joi');

exports.UserValid = Joi.object({
    name: Joi.object({
        first: Joi.string().min(3).max(15).required(),
        middle: Joi.string().optional().allow(''),
        last: Joi.string().min(3).max(15).required(),
    }),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().min(6).max(10).required(),
    image: Joi.object({
        url: Joi.string().optional().allow(''),
        alt: Joi.string().optional().allow(''),
    }),
    address: Joi.object({
        state: Joi.string().min(3).max(20).optional().allow(''),
        country: Joi.string().min(3).max(20).required(),
        city: Joi.string().min(3).max(20).required(),
        street: Joi.string().min(3).max(20).required(),
        houseNumber: Joi.number().max(5).required(),
        zip: Joi.string().optional().allow(''),
    }),
    isAdmin: Joi.boolean().default(false),
    isBusiness: Joi.boolean().default(false),
    connectAttempts: Joi.number().default(0),
    blockDate: Joi.string().default("0"),
});