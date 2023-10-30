<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi";
>>>>>>> 33f828e (feed typescript)

export const selectionSchema = Joi.object({
	price: Joi.number()
		.precision(2)
		.required(),

	art: Joi.string()
		.required(),

	initialDate: Joi.date()
<<<<<<< HEAD
		.format('L')
		.required(),

	finallDate: Joi.date()
		.format('L')
=======
		.format('DD/MM/YYYY')
		.required(),

	finallDate: Joi.date()
		.format('DD/MM/YYYY')
>>>>>>> 33f828e (feed typescript)
		.required(),

	initialTime: Joi.date()
		.format('HH:mm')
		.required(),

	finalTime: Joi.date()
		.format('HH:mm')
		.required(),
});