import axios from 'axios';
import CloudinaryConfig from '../configs/cloudinaryConfig';

export const cldUpload = async (file, params) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CloudinaryConfig.API_KEY);
  // data.append("signature", params.signature);

  for (var k in params) {
    formData.append(k, params[k]);
  }

  return await axios.post(
    `https://api.cloudinary.com/v1_1/${CloudinaryConfig.CLOUD_NAME}/image/upload`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    },
  );
};

export const handleUploadImage = async (file, params) => {
  try {
    const response = await cldUpload(file, params);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to upload image');
  }
};
