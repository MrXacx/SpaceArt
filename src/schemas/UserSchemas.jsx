import * as Joi from "joi";
import { stateSchema, citySchema, addressSchema, neighborhoodSchema } from "./LocationSchemas";

const nameSchema = Joi.string() // string de 1 a 30 caracteres
	.min(1)
	.max(30);

const emailSchema = Joi.string()
	.email({ // string com ao menos 2 domínios e suporte a .com, .br, .org e .net
		minDomainSegments: 2,
		tlds: ['com', 'br', 'org', 'net']
	});

const passwordSchema = Joi.string() // string de 8 a 35 caracteres com letras minúsculas, maiúsculas e números
	.min(8)
	.max(35)
	.pattern(new RegExp('.*[a-z].*'))
	.pattern(new RegExp('.*[A-Z].*'))
	.pattern(new RegExp('.*[0-9].*'));

const phoneSchema = Joi.string() // (XX)9XXXX-XXXX
	.pattern(new RegExp(/^\(\d{2}\)9\d{4}-\d{4}$/));

const postalCodeSchema = Joi.string()// XXXXX-XXX
	.pattern(new RegExp(/^\d{5}-\d{3}$/));

const signUpSchema = {
	name: nameSchema.required(),
	email: emailSchema.required(),
	phone: phoneSchema.required(),
	password: passwordSchema.required(),
	repeatPasswprd: Joi.ref('password'), // deve ser identica ao password
	cep: postalCodeSchema.required(),
	city: citySchema.required(),
	state: stateSchema.required()
};

export const artistSignUpSchema = Joi.object({
	...signUpSchema,
	wage: Joi.number()
		.precision(2),

	cpf: Joi.string()
		.pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)),

	art: Joi.string()
		.required(),

	birthday: Joi.date()
		.format('DD/MM/YYYY')
});

export const enterpriseSignUpSchema = Joi.object({
	...signUpSchema,
	cnpj: Joi.string()
		.pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}\/\d{3}$/)),
	
		section: Joi.string()
			.min(1)
			.max(30)
			.required(),

	address: addressSchema.required(),
	neighborhood: neighborhoodSchema.required(),
});

export const signInSchema = Joi.object({
	email: emailSchema.required(),
	passowrd: passwordSchema.required(),
});