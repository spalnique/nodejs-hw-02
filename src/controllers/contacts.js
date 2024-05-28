import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const contacts = await getAllContacts({ page, perPage });

  if (!contacts.data || !contacts.data.length) {
    next(createHttpError(404, 'Nothing found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24) {
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

  res.status(200).json({
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
  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const result = await updateContact(id, body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.student,
  });
};
