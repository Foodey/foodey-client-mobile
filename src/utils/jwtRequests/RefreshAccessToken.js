import PublicRequest from './PublicRequest';
import MyAsyncStorage from '~/utils/MyAsyncStorage';
import { AuthEndpoint } from '../../constants/API_Endpoints';
import StorageKey from '../../constants/StorageKey';

const RefreshAccessTokenFn = async () => {
  // console.log('Refresh token function getting called');

  const refreshToken = await MyAsyncStorage.getItem(StorageKey.REFRESH_TOKEN);
  // console.log(refreshToken);

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
    // console.log('System has auto requested a new access token !!!');

    MyAsyncStorage.setItem(StorageKey.REFRESH_TOKEN, newRefreshToken);
    MyAsyncStorage.setItem(StorageKey.ACCESS_TOKEN, newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.log('Error refreshing accessToken: ', error);
    return null;
  }
};

export default RefreshAccessTokenFn;
