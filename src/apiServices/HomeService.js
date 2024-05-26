import * as request from '~/utils/jwtRequests';
import { HomeEndpoint } from '../constants/API_Endpoints';
import MyAsyncStorage from '~/utils/MyAsyncStorage';

export const getCategoriesAPI = async () => {
  try {
    const response = await request.public.get(
      `${HomeEndpoint.GET_CATEGORIES}?limit=${12}&page=${0}`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getRestaurantByCategoryAPI = async (categoryID) => {
  try {
    const response = await request.public.get(
      `${HomeEndpoint.GET_RES_BY_CATEGORY_ID}/${categoryID}?page=${0}&size=${12}`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getMenuByRestaurantAPI = async (restaurantID) => {
  try {
    const response = await request.public.get(
      `${HomeEndpoint.GENERAL_SHOP_ENDPOINT}/${restaurantID}/menus/details`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getCartInfoOfResAPI = async (restaurantID) => {
  try {
    const response = await request.private.get(
      `${HomeEndpoint.GENERAL_SHOP_CART_ENDPOINT}/${restaurantID}`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const addProductToCartAPI = async (restaurantID, productID, quantity) => {
  try {
    const response = await request.private.patch(
      `${HomeEndpoint.GENERAL_SHOP_CART_ENDPOINT}/${restaurantID}/products/${productID}?quantity=${quantity}&action=ADD_PRODUCT`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteProductFromCartAPI = async (restaurantID, productID, quantity) => {
  try {
    const response = await request.private.patch(
      `${HomeEndpoint.GENERAL_SHOP_CART_ENDPOINT}/${restaurantID}/products/${productID}?quantity=${quantity}&action=DECREASE_PRODUCT_QUANTITY`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteAllCartProductAPI = async (restaurantID) => {
  try {
    const response = await request.private.delete(
      `${HomeEndpoint.GENERAL_SHOP_CART_ENDPOINT}/${restaurantID}`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const placeOrderAPI = async (restaurantID, voucherCode, paymentMethod, address) => {
  try {
    const response = await request.private.post(`${HomeEndpoint.PLACE_ORDER}`, {
      shopId: restaurantID,
      voucherCode: voucherCode,
      paymentMethod: paymentMethod,
      address: address,
    });
    return response;
  } catch (err) {
    console.log(err.response);
  }
};
