import JoiBase from "joi";
import JoiDate from "@joi/date";

import { UserSchemas } from "./UserSchemas";
import { LocationSchemas } from "../LocationSchemas";

const Joi = JoiBase.extend(JoiDate);

const {
  stateSchema,
  citySchema,
  addressSchema,
  neighborhoodSchema,
  postalCodeSchema,
} = LocationSchemas;
const {
  nameSchema,
  emailSchema,
  phoneSchema,
  passwordSchema,
  cpfSchema,
  cnpjSchema,
  sectionSchema,
  wageSchema,
} = UserSchemas;

const signUpSchema = {
  name: nameSchema.required(),
  email: emailSchema.required(),
  phone: phoneSchema.required(),
  password: passwordSchema.required(),
  repeatPassword: Joi.ref("password"), // deve ser idêntica ao password
  cep: postalCodeSchema.required(),
  city: citySchema.required(),
  state: stateSchema.required(),
};

export const artistSignUpSchema = Joi.object({
  ...signUpSchema,
  wage: wageSchema.required(),

  cpf: cpfSchema
    .error((error) => new Error("É obrigatório apresentar um CPF"))
    .required(),

  art: Joi.string()
    .error(
      (error) =>
        new Error("A pretensão salarial deve conter duas casas decimais")
    )
    .required(),

  birthday: Joi.date()
    .format("DD/MM/YYYY")
    .error((error) => new Error("A data deve seguir o formato DD/MM/AAAA"))
    .required(),
});

export const enterpriseSignUpSchema = Joi.object({
  ...signUpSchema,
  cnpj: cnpjSchema.required(),

  companyName: Joi.string()
    .trim()
    .min(1)
    .max(30)
    .error(
      (error) => new Error("A razão social deve ter entre 1 e 30 caracteres")
    )
    .required(),

  section: sectionSchema.required(),

  address: addressSchema.required(),
  neighborhood: neighborhoodSchema.required(),
});
