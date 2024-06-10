import { upload } from 'cloudinary-react-native';
import AppProperty from '~/constants/AppProperties';
import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';
import { privateRequest } from '~/utils/jwtRequests';

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: AppProperty.CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

export const cldUpload = async (photo, params) => {
  const data = new FormData();
  data.append('file', {
    uri: photo.uri,
    type: photo.type || 'image/jpeg',
    name: photo.fileName || 'upload.jpg',
  });
  // data.append('api_key', '141223257312249');
  // data.append('cloud_name', 'foodey');
  // // data.append('signature', params.signature);
  // // data.append('timestamp', params.timestamp);
  // for (const key in params) {
  //   data.append(key, params[key]);
  // }
  // console.log(data);
  // // // console.log(data);
  privateRequest({
    method: 'post',
    url: '/v1/users/avatar/upload',
    data: data,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  });
  // return await axios.post('https://api.cloudinary.com/v1_1/foodey/image/upload', data, {
  //   headers: {
  //     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  //   },
  // });
  // return await privateRequest.post('/v1/users/avatar/upload', data, {
  //   headers: {
  //     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  //   },
  // });
};

export default cld;
