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
  repeatPassword: Joi.ref("password"), // must be identical to the password
  CEP: postalCodeSchema.required(),
  city: citySchema.required(),
  state: stateSchema.required(),
};

export const artistSignUpSchema = Joi.object({
  ...signUpSchema,
  wage: wageSchema.required(),

  CPF: cpfSchema
    .error((error) => new Error("A CPF is required"))
    .required(),

  art: Joi.string()
    .error(
      (error) =>
        new Error("Salary expectation must have two decimal places")
    )
    .required(),

  birthday: Joi.date()
    .format("DD/MM/YYYY")
    .error((error) => new Error("Date must follow the format DD/MM/YYYY"))
    .required(),
});

export const enterpriseSignUpSchema = Joi.object({
  ...signUpSchema,
  CNPJ: cnpjSchema.required(),

  companyName: Joi.string()
    .trim()
    .min(1)
    .max(30)
    .error(
      (error) => new Error("Company name must have between 1 and 30 characters")
    )
    .required(),

  section: sectionSchema.required(),

  address: addressSchema.required(),
  neighborhood: neighborhoodSchema.required(),
});
