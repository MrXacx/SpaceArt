import JoiBase from "joi";
import JoiDate from "@joi/date";

import { UserSchemas } from "./UserSchemas";
import { LocationSchemas } from "../LocationSchemas";

const Joi = JoiBase.extend(JoiDate);
const { stateSchema, citySchema, addressSchema, neighborhoodSchema, postalCodeSchema } = LocationSchemas;
const { nameSchema, emailSchema, phoneSchema, passwordSchema, cpfSchema, cnpjSchema } = UserSchemas;

const signUpSchema = {
	name: nameSchema.required(),
	email: emailSchema.required(),
	phone: phoneSchema.required(),
	password: passwordSchema.required(),
	repeatPasswprd: Joi.ref('password'), // deve ser idêntica ao password
	cep: postalCodeSchema.required(),
	city: citySchema.required(),
	state: stateSchema.required()
};

export const artistSignUpSchema = Joi.object({
	...signUpSchema,
	wage: Joi.number()
		.precision(2)
		.required(),

	cpf: cpfSchema
		.required(),

	art: Joi.string()
		.required(),

	birthday: Joi.date()
		.format('DD/MM/YYYY')
		.required(),
});

export const enterpriseSignUpSchema = Joi.object({
	...signUpSchema,
	cnpj: cnpjSchema
		.required(),

	section: Joi.string()
		.trim()
		.min(1)
		.max(30)
		.required(),

	address: addressSchema.required(),
	neighborhood: neighborhoodSchema.required(),
});