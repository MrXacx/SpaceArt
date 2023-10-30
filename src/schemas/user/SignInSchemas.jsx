<<<<<<< HEAD
import Joi from "joi";
=======
import * as Joi from "joi";
>>>>>>> 33f828e (feed typescript)

import { UserSchemas } from "./UserSchemas";
const { emailSchema, passwordSchema } = UserSchemas;

export const signInSchema = Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
});
