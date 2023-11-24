import Joi from "joi";

import { UserSchemas } from "./UserSchemas";
import { LocationSchemas } from "../LocationSchemas";

const { citySchema, stateSchema, neighborhoodSchema, addressSchema } =
  LocationSchemas;
const {
  nameSchema,
  descriptionSchema,
  phoneSchema,
  passwordSchema,
  wageSchema,
  sectionSchema,
} = UserSchemas;
const privateDataUpdatingSchema = {
  phone: phoneSchema,
  password: passwordSchema,
  repeatPassword: Joi.ref("password"),

  city: citySchema,
  state: stateSchema,
};

export const enterprisePrivateDataUpdatingSchema = Joi.object({
  ...privateDataUpdatingSchema,
  neighborhood: neighborhoodSchema,
  address: addressSchema,
});

export const artistPrivateDataUpdatingSchema = Joi.object({
  ...privateDataUpdatingSchema,
  wage: wageSchema,
});

export const profileArtistUpdateSchemas = Joi.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  wage: wageSchema.min(1).optional(),
});

export const profileEnterpriseUpdateSchemas = Joi.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  section: sectionSchema.optional(),
  website: Joi.string().uri().optional(),
});
