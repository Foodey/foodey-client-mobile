import axios from 'axios';
import CloudinaryConfig from '../configs/CloudinaryConfig';

export const cldUploadFromDevice = async (file, params) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });
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

export const handleUploadImageFromDevice = async (file, params) => {
  try {
    const response = await cldUploadFromDevice(file, params);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to upload image');
  }
};
