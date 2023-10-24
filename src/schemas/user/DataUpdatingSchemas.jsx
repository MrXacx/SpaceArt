import Joi from "@hapi/joi";

import { UserSchemas } from "./UserSchemas";

const { phoneSchema, passwordSchema, cpfSchema, cnpjSchema } = UserSchemas;
const privateDataUpdatingSchema = {
    phone: phoneSchema,
    password: passwordSchema,
    repeatPassword: Joi.ref('password'),
}

export const enterprisePrivateDataUpdatingSchema = Joi.object({
    ...privateDataUpdatingSchema,
    cpf: cpfSchema,
});

export const artistPrivateDataUpdatingSchema = Joi.object({
    ...privateDataUpdatingSchema,
    cnpj: cnpjSchema,
});