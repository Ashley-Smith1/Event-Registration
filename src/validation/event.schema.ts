import Joi from "joi";

export const eventSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    capacity: Joi.number().integer().min(1).required(),
});