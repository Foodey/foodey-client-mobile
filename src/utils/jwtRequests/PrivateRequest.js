import axios from 'axios';
import RefreshAccessTokenFn from './RefreshAccessToken';
import AppProperty from '~/constants/AppProperties';
import HTTPStatus from '~/constants/HTTPStatusCode';
import MyAsyncStorage from '~/utils/MyAsyncStorage';
import StorageKeys from '~/constants/StorageKeys';

axios.defaults.baseURL = AppProperty.FOODEY_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const accessToken = MyAsyncStorage.getItem(StorageKeys.ACCESS_TOKEN);

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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === HTTPStatus.UNAUTHORIZED && !config?.sent) {
      config.sent = true;
      const newAccessToken = await RefreshAccessTokenFn();

      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axios(config);
      }
      //logout without sending the refresh token back to server
      // toast.warn('Session expired. Please login again.');
      // history.navigate('/login');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const privateRequest = axios;

export default privateRequest;
