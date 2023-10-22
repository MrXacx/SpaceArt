import * as Joi from "joi";
import { stateSchema, citySchema } from "./LocationSchemas";

export const searchSchema = Joi.create({
    searched: Joi.string()
        .min(1)
        .max(256)
        .required(),

    filter: Joi.string()
        .min(1)
        .required(),

    state: stateSchema,
    city: citySchema
})