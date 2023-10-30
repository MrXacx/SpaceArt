<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi";
>>>>>>> 33f828e (feed typescript)

export const LocationSchemas = {
    postalCodeSchema: Joi.string()// XXXXX-XXX
        .pattern(new RegExp(/^\d{8}$/)),

    citySchema: Joi.string() // string entre 4 e 100 caracteres
        .trim()
        .min(4)
        .max(100),

    stateSchema: Joi.string() // Deve ter 2 caracteres maiúsculos
<<<<<<< HEAD
        .pattern(/^[A-Z]{2}$/),
=======
        .pattern(/^[AZ]{2}$/),
>>>>>>> 33f828e (feed typescript)

    addressSchema: Joi.string()
        .trim()
        .min(1),

    neighborhoodSchema: Joi.string()
        .trim()
        .min(3),
<<<<<<< HEAD
}
=======
}
>>>>>>> 33f828e (feed typescript)
