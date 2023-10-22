import * as Joi from "joi";

export const citySchema = Joi.string() // string entre 4 e 100 caracteres
    .min(4)
    .max(100);

export const stateSchema = Joi.string() // Deve ter 2 caracteres maiúsculos
    .pattern(/^[AZ]{2}$/);

export const addressSchema = Joi.string()
    .min(1);

export const neighborhoodSchema = Joi.string()
    .min(3);