import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const agreementSchema = Joi.object({

	art: Joi.string()
		.trim()
		.required()
		.error(error => new Error("É obrigatório informar uma modalidade artística")),

	description: Joi.string()
		.trim()
		.min(1)
		.max(256)
		.required()
		.error(error => new Error("A descrição deve ter entre 1 e 256 caracteres")),

	price: Joi.number()
		.precision(2)
		.required()
		.error(error => new Error("É obrigatório informar um valor de pagamento")),

	date: Joi.date()
		.format('DD/MM/YYYY')
		.required()
		.error(error => new Error("A data do evento deve seguir o formato DD/MM/AAAA")),

	initialTime: Joi.date()
		.format('HH:mm')
		.required()
		.error(error => new Error("O horário de início do evento deve seguir o formato hh:mm")),

	finalTime: Joi.date()
		.format('HH:mm')
		.required()
		.error(error => new Error("O horário de fim do evento deve seguir o formato hh:mm")),

});
