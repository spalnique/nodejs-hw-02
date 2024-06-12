import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email()
    .pattern(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
    )
    .required()
    .messages({ 'string.pattern.base': 'Mordor emails are not accepted.' }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one small and one capital letters.',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
