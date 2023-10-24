import Joi from "@hapi/joi";

export const UserSchemas = {
	nameSchema: Joi.string() // string de 1 a 30 caracteres
		.min(1)
		.max(30),

	emailSchema: Joi.string()
		.email({ // string com ao menos 2 domínios e suporte a .com, .br, .org e .net
			minDomainSegments: 2,
			tlds: ['com', 'br', 'org', 'net']
		}),

	passwordSchema: Joi.string() // string de 8 a 35 caracteres com letras minúsculas, maiúsculas e números
		.min(8)
		.max(35)
		.pattern(new RegExp('.*[a-z].*[A-Z].*[0-9].*')),

	phoneSchema: Joi.string() // (XX)9XXXX-XXXX
		.pattern(new RegExp(/^\\d{2}9\d{8}$/)),

	cpfSchema: Joi.string()
		.pattern(new RegExp(/^\d{11}$/)),

	cnpjSchema: Joi.string()
		.pattern(new RegExp(/^\d{14}$/)),
};