<<<<<<< HEAD
import JoiBase from "joi";
import JoiDate  from "@joi/date";

import { UserSchemas } from "./UserSchemas";
import { LocationSchemas } from "../LocationSchemas";

const Joi = JoiBase.extend(JoiDate);
=======
import * as Joi from "joi";
import { UserSchemas } from "./UserSchemas";
import { LocationSchemas } from "../LocationSchemas";

>>>>>>> 33f828e (feed typescript)
const { stateSchema, citySchema, addressSchema, neighborhoodSchema, postalCodeSchema } = LocationSchemas;
const { nameSchema, emailSchema, phoneSchema, passwordSchema, cpfSchema, cnpjSchema } = UserSchemas;

const signUpSchema = {
	name: nameSchema.required(),
	email: emailSchema.required(),
	phone: phoneSchema.required(),
	password: passwordSchema.required(),
<<<<<<< HEAD
	repeatPassword: Joi.ref('password'), // deve ser idêntica ao password
=======
	repeatPasswprd: Joi.ref('password'), // deve ser idêntica ao password
>>>>>>> 33f828e (feed typescript)
	cep: postalCodeSchema.required(),
	city: citySchema.required(),
	state: stateSchema.required()
};

export const artistSignUpSchema = Joi.object({
	...signUpSchema,
	wage: Joi.number()
		.precision(2)
<<<<<<< HEAD
		.error(error => new Error("A pretensão salarial deve conter duas casas decimais"))
=======
>>>>>>> 33f828e (feed typescript)
		.required(),

	cpf: cpfSchema
		.required(),

	art: Joi.string()
		.required(),

	birthday: Joi.date()
		.format('DD/MM/YYYY')
<<<<<<< HEAD
		.error(error => new Error("A data deve seguir o formato dd/mm/aaaa"))
		.required()
		.error(error => new Error("A data de aniversário é obrigatória")),
=======
		.required(),
>>>>>>> 33f828e (feed typescript)
});

export const enterpriseSignUpSchema = Joi.object({
	...signUpSchema,
	cnpj: cnpjSchema
		.required(),

	section: Joi.string()
		.trim()
		.min(1)
		.max(30)
<<<<<<< HEAD
		.error(error => new Error("A seção deve conter entre 1 e 30 caracteres"))
=======
>>>>>>> 33f828e (feed typescript)
		.required(),

	address: addressSchema.required(),
	neighborhood: neighborhoodSchema.required(),
<<<<<<< HEAD
});
=======
});
>>>>>>> 33f828e (feed typescript)
