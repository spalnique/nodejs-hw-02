import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  updateUserDataController,
  logoutUserController,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  registerUserSchema,
  updateUserDataSchema,
} from '../validation/users.js';
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

export default authRouter;
