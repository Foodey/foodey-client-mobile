import * as request from '~/utils/jwtRequests';
import { SellerEndpoint } from '../constants/API_Endpoints';

export const getSellerBrandAPI = async (page) => {
  try {
    const response = await request.private.get(`${SellerEndpoint.BRAND}?page=0&size=${page}`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getShopOfBrandAPI = async (brandID) => {
  try {
    const response = await request.private.get(`${SellerEndpoint.SHOP}/${brandID}`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};
