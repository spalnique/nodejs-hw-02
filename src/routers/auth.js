import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  updateUserDataController,
  logoutUserController,
  resetEmailRequestController,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetEmailRequestSchema,
  updateUserDataSchema,
} from '../validation/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUserSessionController),
);
authRouter.post(
  '/edit',
  authenticate,
  validateBody(updateUserDataSchema),
  ctrlWrapper(updateUserDataController),
);
authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));
authRouter.post(
  '/request-reset-email',
  validateBody(resetEmailRequestSchema),
  ctrlWrapper(resetEmailRequestController),
);

export default authRouter;
