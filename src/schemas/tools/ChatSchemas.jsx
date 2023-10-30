<<<<<<< HEAD
import JoiBase from "joi";
const Joi = JoiBase.extend();
=======
import * as Joi from "joi"

>>>>>>> 33f828e (feed typescript)
export const messageSchemma = Joi.string()
	.min(1)
	.max(256);