import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res, next) => {
  const { body } = req;
  const user = await registerUser(body);

  res.json({
    status: 200,
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
    message: 'Successfully logged in!',
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

  console.log('{sessionId, refreshToken}', { sessionId, refreshToken });

  const session = await refreshUserSession({ sessionId, refreshToken });
  const { accessToken } = session;

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken },
  });
};
