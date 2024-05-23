import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { getContactByIdController } from './controllers/getContactByIdController.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getAllContactsController } from './controllers/getAllContactsController.js';

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

  app.get('/contacts', getAllContactsController);
  app.get('/contacts/:id', getContactByIdController);

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running at ${new URL(`http://localhost:${PORT}/`)}`);
  });
}
