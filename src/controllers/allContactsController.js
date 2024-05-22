import { getAllContacts } from '../services/contacts.js';

export const allContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: contacts.length
      ? 'Successfully found contacts!'
      : 'No contacts were found.',
    data: contacts,
  });
};
