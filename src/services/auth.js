import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ENV_VARS } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

import { createUserSession } from '../utils/createUserSession.js';
import { sendMail } from '../utils/sendMail.js';
import { env } from '../utils/env.js';
import { getMailTemplate } from '../utils/getMailTemplate.js';

export const registerUser = async (payload) => {
  const isEmailInUse = await UsersCollection.findOne({ email: payload.email });
  if (isEmailInUse) throw createHttpError(409, 'Email is already in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isValidPassword = await bcrypt.compare(payload.password, user.password);
  if (!isValidPassword) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ _id: user._id });

  return await SessionsCollection.create({
    userId: user._id,
    ...createUserSession(),
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const { userId, refreshTokenValidUntil } = session;

  const isRefreshTokenExpired = new Date() > new Date(refreshTokenValidUntil);
  if (isRefreshTokenExpired)
    throw createHttpError(401, 'Session token expired');

  await SessionsCollection.deleteOne({ _id: sessionId });

  return await SessionsCollection.create({
    userId,
    ...createUserSession(),
  });
};

export const logoutUser = async (sessionId) =>
  await SessionsCollection.deleteOne({ _id: sessionId });

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) throw createHttpError(404, 'User not found.');

  const resetToken = jwt.sign(
    { sub: user._id, email },
    env(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );
  const domain = env(ENV_VARS.APP_DOMAIN);
  const { name } = user;
  const link = `${domain}/reset-password?token=${resetToken}`;

  const template = await getMailTemplate('reset-password-mail.html');
  const html = template({ name, link });

  try {
    await sendMail({
      from: env(ENV_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password / Contacts App',
      html,
    });
    console.log('resetToken : ', resetToken);
  } catch (error) {
    console.error(error);

    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (payload) => {
  const { token, password } = payload;

  try {
    var { email, sub: _id } = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw error;
  }

  const user = await UsersCollection.findOne({ _id, email });

  if (!user) throw createHttpError(404, 'User not found.');

  const encryptedPassword = await bcrypt.hash(password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
