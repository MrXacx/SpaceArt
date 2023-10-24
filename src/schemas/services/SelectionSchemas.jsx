import Joi from "joi";

export const selectionSchema = Joi.object({
	price: Joi.number()
		.precision(2)
		.required(),

	art: Joi.string()
		.required(),

	initialDate: Joi.date()
		.format('L')
		.required(),

	finallDate: Joi.date()
		.format('L')
		.required(),

	initialTime: Joi.date()
		.format('HH:mm')
		.required(),

	finalTime: Joi.date()
		.format('HH:mm')
		.required(),
});