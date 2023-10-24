import Joi from "@hapi/joi";
import { stateSchema, citySchema } from "../LocationSchemas";

export const searchSchema = Joi.create({
	searched: Joi.string()
		.min(1)
		.max(256)
		.required(),

	filter: Joi.string()
		.pattern(/(name)|(location)/)
		.required(),

	name: Joi.string()
		.min(1)
		.max(30),

	state: stateSchema,
	city: citySchema
})