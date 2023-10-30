<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi";
>>>>>>> 33f828e (feed typescript)

import { UserSchemas } from "./UserSchemas";

const { phoneSchema, passwordSchema, cpfSchema, cnpjSchema } = UserSchemas;
const privateDataUpdatingSchema = {
    phone: phoneSchema,
    password: passwordSchema,
<<<<<<< HEAD
    repeatPassword: Joi.error(error => new Error("As senhas deve ser idênticas")).ref('password'),
=======
    repeatPassword: Joi.ref('password'),
>>>>>>> 33f828e (feed typescript)
}

export const enterprisePrivateDataUpdatingSchema = Joi.object({
    ...privateDataUpdatingSchema,
    cpf: cpfSchema,
});

export const artistPrivateDataUpdatingSchema = Joi.object({
    ...privateDataUpdatingSchema,
    cnpj: cnpjSchema,
});