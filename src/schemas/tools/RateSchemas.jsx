<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi";
>>>>>>> 33f828e (feed typescript)

export const rateSchema = Joi.object({
	rate: Joi.number()
		.trim()
		.precision(1)
		.required(),

	description: Joi.string()
		.trim()
		.min(1)
		.max(256)
		.required()

});