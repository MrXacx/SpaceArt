import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const agreementSchema = Joi.object({
  art: Joi.string()
    .trim()
    .required()
    .error(
      (error) => new Error("It is mandatory to provide an artistic modality")
    ),

  description: Joi.string()
    .trim()
    .min(1)
    .max(256)
    .required()
    .error(
      (error) => new Error("Description must have between 1 and 256 characters")
    ),

  price: Joi.number()
    .precision(2)
    .required()
    .error(
      (error) => new Error("It is mandatory to provide a payment amount")
    ),

  date: Joi.date()
    .format("DD/MM/YYYY")
    .required()
    .error(
      (error) => new Error("Event date must follow the format DD/MM/YYYY")
    ),

  initialTime: Joi.date()
    .format("HH:mm")
    .required()
    .error(
      (error) =>
        new Error("Event start time must follow the format HH:mm")
    ),

  finalTime: Joi.date()
    .format("HH:mm")
    .required()
    .error(
      (error) =>
        new Error("Event end time must follow the format HH:mm")
    ),
});
