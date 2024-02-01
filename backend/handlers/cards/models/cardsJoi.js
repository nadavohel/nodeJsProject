const Joi = require('joi');

exports.CardValid = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    subtitle: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(10).max(2500).required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email({ tlds: false }).required(),
    web: Joi.string().min(9).required(),
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
    bizNumber: Joi.string().min(7).max(7).optional().allow(''),
});

exports.BizNumberValid = Joi.object({
    bizNumber: Joi.string().min(7).max(7).regex(/[0-9]/).optional().allow(''),
});