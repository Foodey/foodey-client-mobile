import * as request from '~/utils/jwtRequests';
import AuthEndpoint from '~/constants/API_Endpoints';
import MyAsyncStorage from '~/utils/MyAsyncStorage';
import PublicRequest from '../utils/jwtRequests/PublicRequest';

export const loginAPI = async (data) => {
  try {
    const response = await request.public.post(AuthEndpoint.LOGIN, data);
    return response;
  } catch (err) {
    return err.response;
  }
};
