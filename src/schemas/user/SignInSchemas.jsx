import Joi from "@hapi/joi";

import { UserSchemas } from "./UserSchemas";
const { emailSchema, passwordSchema } = UserSchemas;

export const signInSchema = Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
});
