import * as Joi from "joi"

export const messageSchemma = Joi.string()
    .min(1)
    .max(256);