export const contactByIdController = async (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    res.status(400).json({
      status: 400,
      message:
        'Wrong id. Contact id has to be of 24 alphanumerical symbols length',
    });
  } else {
    const contact = await getContactById(id);
    if (contact === null) {
      res.status(404).json({
        status: 404,
        message: `There is no contact with such id: ${id}`,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}`,
        data: contact,
      });
    }
  }
};
