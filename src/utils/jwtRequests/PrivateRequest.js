import axios from 'axios';
import RefreshAccessTokenFn from './RefreshAccessToken';
import AppProperty from '~/constants/AppProperties';
import HTTPStatus from '~/constants/HTTPStatusCodes';
import MyAsyncStorage from '~/utils/MyAsyncStorage';
import StorageKey from '~/constants/StorageKey';

const PrivateRequest = axios.create();

PrivateRequest.defaults.baseURL = AppProperty.FOODEY_API_URL;

PrivateRequest.interceptors.request.use(
  async (config) => {
    // console.log('Private request being sent');
    const accessToken = await MyAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

PrivateRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // console.log('An error response from private request');

    const config = error?.config;
    // console.log(error?.response?.status);
    if (error?.response?.status === HTTPStatus.UNAUTHORIZED && !config?.sent) {
      config.sent = true;
      const newAccessToken = await RefreshAccessTokenFn();

      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return PrivateRequest(config);
      }
      //logout without sending the refresh token back to server
      // toast.warn('Session expired. Please login again.');
      // history.navigate('/login');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// const PrivateRequest = axios;

export default PrivateRequest;
