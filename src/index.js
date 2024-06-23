import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDir } from './utils/createDir.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDir(TEMP_UPLOAD_DIR);
  await createDir(UPLOAD_DIR);
  setupServer();
};

void bootstrap();
