import joi from 'joi';

export const registerUserSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi
    .string()
    .email()
    .pattern(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
    )
    .required()
    .messages({ 'string.pattern.base': 'Mordor emails are not accepted.' }),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one small and one capital letters.',
    }),
});

export const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const updateUserDataSchema = joi.object({
  password: joi.string().required(),
  newName: joi.string().min(3).max(30),
  newEmail: joi
    .string()
    .email()
    .pattern(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
    )
    .messages({ 'string.pattern.base': 'Mordor emails are not accepted.' }),
  newPassword: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/)
    .messages({
      'string.pattern.base':
        'Password must contain at least one small and one capital letters.',
    }),
});

export const sendResetEmailSchema = joi.object({
  email: joi.string().email().required(),
});

export const resetPasswordSchema = joi.object({
  password: joi.string().required(),
  token: joi.string().required(),
});
