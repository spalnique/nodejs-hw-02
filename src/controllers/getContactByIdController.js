import { getContactById } from '../services/contacts.js';

export const getContactByIdController = async (req, res) => {
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
    return res.status(404).json({
      status: 404,
      message: `There is no contact with such id: ${id}`,
    });
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}`,
    data: contact,
  });
};
