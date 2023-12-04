import Joi from "joi";

export const LocationSchemas = {
  postalCodeSchema: Joi.string() // XXXXX-XXX
    .pattern(new RegExp(/^\d{8}$/)),
  citySchema: Joi.string() // String between 4 and 100 characters
    .trim()
    .min(4)
    .max(100),
  stateSchema: Joi.string() // Must have 2 uppercase characters
    .pattern(/^[A-Z]{2}$/),
  addressSchema: Joi.string().trim().min(1),
  neighborhoodSchema: Joi.string().trim().min(3),
};
