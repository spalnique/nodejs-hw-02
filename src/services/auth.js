import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { createUserSession } from '../utils/createUserSession.js';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

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

export const logoutUser = async (sessionId) => {
  return await SessionsCollection.deleteOne({ _id: sessionId });
};

export const updateUserData = async (payload, userId) => {
  const { newName, newEmail, newPassword } = payload;

  const user = await UsersCollection.findOne({ _id: userId });
  if (!user) throw createHttpError(404, 'User not found');

  const isValidPassword = await bcrypt.compare(payload.password, user.password);
  if (!isValidPassword) throw createHttpError(401, 'Unauthorized');

  let updatePayload = {};

  if (newName) {
    updatePayload.name = newName;
  }

  if (newEmail) {
    updatePayload.email = newEmail;
  }

  if (newPassword) {
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    updatePayload.password = encryptedPassword;
  }

  return await UsersCollection.findOneAndUpdate(
    { _id: userId },
    updatePayload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );
};
