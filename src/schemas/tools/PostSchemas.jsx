import Joi from "joi";

export const postSchema = Joi.object({
	content: Joi.string()
		.min(1)
		.max(256)
		.required(),

	media: Joi.string()
		.required(),
});