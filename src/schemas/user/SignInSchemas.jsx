import * as Joi from "joi";

import { UserSchemas } from "./UserSchemas";
const { emailSchema, passwordSchema } = UserSchemas;

export const signInSchema = Joi.object({
    email: emailSchema.required(),
    passowrd: passwordSchema.required(),
});
