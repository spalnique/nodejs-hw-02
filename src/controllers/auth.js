import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res, next) => {
  const { body } = req;
  const user = await registerUser(body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered new user!',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const { body } = req;
  const session = await loginUser(body);
  const { accessToken } = session;

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  const {
    cookies: { sessionId },
  } = req;

  if (sessionId) await logoutUser(sessionId);

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res, next) => {
  const {
    cookies: { sessionId, refreshToken },
  } = req;

  const session = await refreshUserSession({ sessionId, refreshToken });
  const { accessToken } = session;

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken },
  });
};

export const resetEmailRequestController = async (req, res, next) => {
  const {
    body: { email },
  } = req;

  await requestResetToken(email);

  res.json({
    status: 200,
    message: 'Reset password email was successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res, next) => {
  const { body } = req;
  await resetPassword(body);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};
