import Joi from "joi";

import { UserSchemas } from "./UserSchemas";
import { LocationSchemas } from "../LocationSchemas";

const {
  postalCodeSchema,
  citySchema,
  stateSchema,
  neighborhoodSchema,
  addressSchema,
} = LocationSchemas;
const {
  nameSchema,
  descriptionSchema,
  phoneSchema,
  passwordSchema,
  wageSchema,
  sectionSchema,
} = UserSchemas;

const privateDataUpdatingSchema = {
  phone: phoneSchema.optional(),
  password: passwordSchema.optional(),
  repeatPassword: Joi.ref("password"),
  CEP: postalCodeSchema.optional(),
  city: citySchema.optional(),
  state: stateSchema.optional(),
};

export const enterprisePrivateDataUpdatingSchema = Joi.object({
  ...privateDataUpdatingSchema,
  neighborhood: neighborhoodSchema.optional(),
  address: addressSchema.optional(),
});

export const artistPrivateDataUpdatingSchema = Joi.object(
  privateDataUpdatingSchema
);

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
