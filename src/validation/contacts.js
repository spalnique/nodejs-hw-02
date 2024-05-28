import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phoneNumber: Joi.string().min(8).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .default('personal'),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(2),
  phoneNumber: Joi.string().min(8),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
