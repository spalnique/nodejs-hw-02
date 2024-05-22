import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
  const app = express();
  const PORT = Number(env(ENV_VARS.PORT, 3000));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}`,
      data: contact,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
