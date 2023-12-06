import Joi from "joi";

export const UserSchemas = {
  nameSchema: Joi.string() // String from 1 to 30 characters
    .min(1)
    .error((error) => new Error("Name must have at least one character"))
    .max(30)
    .error((error) => new Error("Name must have up to 30 characters")),

  emailSchema: Joi.string()
    .email({
      // String with at least 2 domains and support for .com, .br, .org, and .net
      minDomainSegments: 2,
      tlds: ["com", "br", "org", "net"],
    })
    .error((error) => new Error("The provided email is invalid")),

  passwordSchema: Joi.string() // String from 8 to 35 characters with lowercase, uppercase, and numbers
    .min(8)
    .max(35)
    .error((error) => new Error("Password must have between 8 and 35 characters"))
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      )
    )
    .error(
      (error) =>
        new Error(
          "Password must contain uppercase and lowercase letters, numbers, and symbols"
        )
    ),

  phoneSchema: Joi.string() // (XX)9XXXX-XXXX
    .pattern(new RegExp(/^\d{2}9\d{8}$/))
    .error(
      (error) => new Error("Phone must contain the area code and other 9 digits")
    ),

  cpfSchema: Joi.string()
    .pattern(new RegExp(/^\d{11}$/))
    .error((error) => new Error("CPF must contain 11 digits")),

  cnpjSchema: Joi.string()
    .pattern(new RegExp(/^\d{14}$/))
    .error((error) => new Error("CNPJ must contain 14 digits")),

  descriptionSchema: Joi.string().trim().max(256),

  wageSchema: Joi.number().min(1),

  sectionSchema: Joi.string()
    .trim()
    .min(1)
    .max(30)
    .error((error) => new Error("Section must have between 1 and 30 characters")),
};
