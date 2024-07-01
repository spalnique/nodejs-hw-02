import { ENABLE_CLOUDINARY } from '../constants/index.js';
import { env } from './env.js';
import { saveImageToCloudinary } from './saveImageToCloudinary.js';
import { saveImageToUploads } from './saveImageToUploads.js';

export const saveImageDestination = async (image) => {
  if (!image) return;

  const imagePath =
    env(ENABLE_CLOUDINARY) === 'true'
      ? await saveImageToCloudinary(image)
      : await saveImageToUploads(image);

  return imagePath;
};
