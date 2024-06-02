import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: contacts.length
      ? 'Successfully found contacts!'
      : 'No contacts were found.',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(
      createHttpError(
        400,
        'Wrong id. Contact id has to be of 24 alphanumerical symbols length',
      ),
    );
    return;
  }

  const contact = await getContactById(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const { body } = req;

  const contact = await createContact(body);

  if (!contact) {
    next(
      createHttpError(
        400,
        "Couldn't create new contact. 'name' and/or 'phoneNumber' properties are missing",
      ),
    );
    return;
  }

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(
      createHttpError(
        400,
        'Wrong id. Contact id has to be of 24 alphanumerical symbols length.',
      ),
    );
    return;
  }

  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Contact "${contact.name}" has been deleted.`,
  });
};

export const patchContactController = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    next(
      createHttpError(
        400,
        'Wrong id. Contact id has to be of 24 alphanumerical symbols length.',
      ),
    );
    return;
  }

  const contact = await updateContact(id, body);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.contact.value,
  });
};
