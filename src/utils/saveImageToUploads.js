import fs from 'node:fs/promises';
import path from 'node:path';

import { env } from './env.js';
import { ENV_VARS, TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

export const saveImageToUploads = async (image) => {
  const tempPath = path.join(TEMP_UPLOAD_DIR, image.filename);
  const newPath = path.join(UPLOAD_DIR, image.filename);

  await fs.rename(tempPath, newPath);

  return `${env(ENV_VARS.APP_DOMAIN)}/uploads/${image.filename}`;
};
