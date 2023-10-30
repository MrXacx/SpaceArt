<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi"
>>>>>>> 33f828e (feed typescript)

export const agreementSchema = Joi.object({
	hired: Joi.string()
		.uuid()
		.length(36)
		.required(),

	art: Joi.string()
		.trim()
		.required(),

	description: Joi.string()
		.trim()
		.min(1)
		.max(256)
		.required(),

	price: Joi.number()
		.precision(2)
		.required(),

	date: Joi.date()
<<<<<<< HEAD
		.format('L')
=======
		.format('DD/MM/YYYY')
>>>>>>> 33f828e (feed typescript)
		.required(),

	initialTime: Joi.date()
		.format('HH:mm')
		.required(),

	finalTime: Joi.date()
		.format('HH:mm')
		.required()

});