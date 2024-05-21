import * as request from '~/utils/jwtRequests';
import { HomeEndpoint } from '~/constants/API_Endpoints';
import MyAsyncStorage from '~/utils/MyAsyncStorage';

export const getCategories = async () => {
  try {
    const response = await request.public.get(HomeEndpoint.GET_CATEGORIES, {
      params: { page: 1, limit: 12 },
    });
    return response;
  } catch (err) {
    console.log(err.response);
  }
};
