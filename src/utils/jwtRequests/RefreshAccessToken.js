import PublicRequest from './PublicRequest';
import MyAsyncStorage from '~/utils/MyAsyncStorage';
import AuthEndpoint from '~/constants/API_Endpoints';
import StorageKeys from '~/constants/StorageKeys';

const RefreshAccessTokenFn = async () => {
  const refreshToken = MyAsyncStorage.getItem(StorageKeys.REFRESH_TOKEN);

  if (!refreshToken) {
    return null;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const response = await PublicRequest.post(AuthEndpoint.REFRESH_TOKEN, null, config);

    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    MyAsyncStorage.setItem(StorageKeys.REFRESH_TOKEN, newRefreshToken);
    MyAsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, newAccessToken);

    return newAccessToken;
  } catch (error) {
    // if (rememberMe) {
    //   localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    //   localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    // } else {
    //   sessionStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    //   sessionStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    // }
    console.log('Error when refreshing accessToken: ', error);
    return null;
  }
};

export default RefreshAccessTokenFn;
