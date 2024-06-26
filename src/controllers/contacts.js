import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveImageToUploads } from '../utils/saveImageToUploads.js';
import { saveImageToCloudinary } from '../utils/saveImageToCloudinary.js';
import { env } from '../utils/env.js';
import { ENABLE_CLOUDINARY } from '../constants/index.js';
import { saveImage } from '../utils/saveImage.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const {
    user: { _id: userId },
  } = req;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const {
    params: { id: contactId },
    user: { _id: userId },
  } = req;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const {
    body,
    user: { _id: userId },
    file: image,
  } = req;

  const imagePath = await saveImage(image);

  const contact = await createContact({
    ...body,
    userId,
    photo: imagePath,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const {
    params: { id: contactId },
    user: { _id: userId },
  } = req;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const {
    body,
    params: { id: contactId },
    user: { _id: userId },
    file: image,
  } = req;

  const imagePath = await saveImage(image);

  const contact = await updateContact(contactId, userId, {
    ...body,
    photo: imagePath,
  });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
