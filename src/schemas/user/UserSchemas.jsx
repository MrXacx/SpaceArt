import Joi from "joi";

export const UserSchemas = {
	nameSchema: Joi.string() // string de 1 a 30 caracteres
		.min(1)
		.error(error => new Error("O nome deve conter ao menos um caractere"))
		.max(30)
		.error(error => new Error("O nome deve conter até 30 caracteres")),

	emailSchema: Joi.string()
		.email({ // string com ao menos 2 domínios e suporte a .com, .br, .org e .net
			minDomainSegments: 2,
			tlds: ['com', 'br', 'org', 'net']
		})
		.error(error => new Error("O email apresentado é inválido")),

	passwordSchema: Joi.string() // string de 8 a 35 caracteres com letras minúsculas, maiúsculas e números
		.min(8)
		.max(35)
		.error(error => new Error("A senha deve conter entre 8 e 35 caractes"))
		.pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/))
		.error(error => new Error("A senha deve conter letras maiúsculas, minúsculas, números e símbolos")),

	phoneSchema: Joi.string() // (XX)9XXXX-XXXX
		.pattern(new RegExp(/^\\d{2}9\d{8}$/))
		.error(error => new Error("O telefone deve conter o DDD e outros 9 dígitos")),

	cpfSchema: Joi.string()
		.pattern(new RegExp(/^\d{11}$/))
		.error(error => new Error("O CPF deve conter 11 dígitos")),

	cnpjSchema: Joi.string()
		.pattern(new RegExp(/^\d{14}$/))
		.error(error => new Error("O CNPJ deve conter 14 dígitos")),
};
