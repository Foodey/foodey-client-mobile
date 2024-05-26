import * as request from '~/utils/jwtRequests';
import { OrdersEndpoint } from '../constants/API_Endpoints';

export const getPendingOrderAPI = async () => {
  try {
    const response = await request.private.get(`${OrdersEndpoint.GET_USER_ORDER}?status=PENDING`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getDeliveredOrderAPI = async () => {
  try {
    const response = await request.private.get(`${OrdersEndpoint.GET_USER_ORDER}?status=DELIVERED`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};
