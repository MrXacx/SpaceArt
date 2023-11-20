import JoiBase from "joi";
const Joi = JoiBase.extend();

export const messageSchemma = Joi.string().min(1).max(256);
