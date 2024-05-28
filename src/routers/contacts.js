import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:id', ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/contacts/:id', ctrlWrapper(deleteContactController));
router.patch(
  '/contacts/:id',
  validateBody(patchContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
