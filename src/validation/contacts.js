import joi from 'joi';

export const createContactSchema = joi.object({
  name: joi.string().min(2).required(),
  phoneNumber: joi.string().min(8).required(),
  email: joi.string().email().optional(),
  isFavourite: joi.boolean().default(false),
  contactType: joi
    .string()
    .valid('work', 'home', 'personal')
    .optional()
    .default('personal'),
  photo: joi.string(),
});

export const patchContactSchema = joi.object({
  name: joi.string().min(2),
  phoneNumber: joi.string().min(8),
  email: joi.string().email(),
  isFavourite: joi.boolean(),
  contactType: joi.string().valid('work', 'home', 'personal'),
  photo: joi.string(),
});
