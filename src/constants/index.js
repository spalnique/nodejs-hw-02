export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  JWT_SECRET: 'JWT_SECRET',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const KEYS_OF_CONTACT = {
  _id: '_id',
  name: 'name',
  phoneNumber: 'phoneNumber',
  email: 'email',
  isFavourite: 'isFavourite',
  contactType: 'contactType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
