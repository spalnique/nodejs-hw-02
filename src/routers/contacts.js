import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';
import { validateMongoId } from '../middlewares/validateId.js';

const contactsRouter = Router();

contactsRouter.use('/:someId', validateMongoId('someId'));
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));
contactsRouter.patch(
  '/:id',
  validateBody(patchContactSchema),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
