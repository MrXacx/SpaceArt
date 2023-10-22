import * as Joi from "joi"

export const agreementSchema = Joi.object({
    hired: Joi.string()
        .length(36)
        .required(),

    art: Joi.string()
        .required(),

    price: Joi.number()
        .precision(2)
        .required(),

    initialDate: Joi.date()
        .format('DD/MM/YYYY')
        .required(),

    finalDate: Joi.date()
        .format('DD/MM/YYYY')
        .required(),

    initialTime: Joi.date()
        .format('HH:mm')
        .required(),
        
    finalTime: Joi.date()
        .format('HH:mm')
        .required()

});