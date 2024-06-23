import fs from 'node:fs/promises';
import path from 'node:path';

import { env } from './env.js';
import { ENV_VARS, TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

export const savePhotoToUploads = async (photo) => {
  const oldPath = path.join(TEMP_UPLOAD_DIR, photo.filename);
  const newPath = path.join(UPLOAD_DIR, photo.filename);

  await fs.rename(oldPath, newPath);

  return `${env(ENV_VARS.APP_DOMAIN)}/uploads/${photo.filename}`;
};
