import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: contacts.length
      ? 'Successfully found contacts!'
      : 'No contacts were found.',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({
      status: 400,
      message:
        'Wrong id. Contact id has to be of 24 alphanumerical symbols length',
    });
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

  // if (!body.hasOwnProperty('name') || !body.hasOwnProperty('phoneNumber')) {
  //   next(
  //     createHttpError(
  //       400,
  //       'Contact name and phone number are required to create a new contact',
  //     ),
  //   );
  //   return;
  // }

  const contact = await createContact(body);
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

export const upsertContactController = async (req, res) => {
  const { body, params: id } = req;

  const result = await updateContact(id, body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  const { contact } = result;

  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body, params: id } = req;
  const result = await updateContact(JSON.stringify(id), body);

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
