import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveImageToCloudinary = async (image) => {
  const response = await cloudinary.uploader.upload(image.path);
  await fs.unlink(image.path);
  return response.secure_url;
};
