import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const selectionSchema = Joi.object({
  price: Joi.number().precision(2).required(),

  title: Joi.string().required().max(30),

  art: Joi.string().required(),

  initialDate: Joi.date().format("DD/MM/YYYY").required(),

  finalDate: Joi.date().format("DD/MM/YYYY").required(),

  initialTime: Joi.date().format("HH:mm").required(),

  finalTime: Joi.date().format("HH:mm").required(),
});
