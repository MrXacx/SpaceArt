import * as Joi from "joi";

export const rateSchema = Joi.object({
    rate: Joi.number()
        .precision(1)
        .required(),

    description: Joi.string()
        .min(1)
        .max(256)
        .required()

});