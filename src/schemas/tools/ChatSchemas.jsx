import JoiBase from "@hapi/joi";
const Joi = JoiBase.extend();
export const messageSchemma = Joi.string()
	.min(1)
	.max(256);