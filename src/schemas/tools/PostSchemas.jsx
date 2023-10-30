<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi";
>>>>>>> 33f828e (feed typescript)

export const postSchema = Joi.object({
	content: Joi.string()
		.min(1)
		.max(256)
		.required(),

	media: Joi.string()
		.required(),
});