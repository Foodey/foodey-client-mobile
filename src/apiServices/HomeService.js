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

export const getMenuByRestaurantAPI = async (brandID, restaurantID) => {
  try {
    const response = await request.public.get(
      `${HomeEndpoint.GET_MENU_BY_SHOP_ID}/${brandID}/shops/${restaurantID}/menu/full`,
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

export const placeOrderAPI = async (
  restaurantID,
  voucherCode,
  paymentMethod,
  detailsAddress,
  latitude,
  longitude,
  note,
) => {
  try {
    const response = await request.private.post(`${HomeEndpoint.PLACE_ORDER}`, {
      shopId: restaurantID,
      voucherCode: voucherCode,
      paymentMethod: paymentMethod,
      shippingAddress: {
        detailsAddress: detailsAddress,
        latitude: latitude,
        longitude: longitude,
      },
      note: note,
    });
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const cancelOrderAPI = async (orderID) => {
  try {
    const response = await request.private.patch(`${HomeEndpoint.PLACE_ORDER}/${orderID}/cancel`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const searchResByNameAPI = async (searchValue, page, size) => {
  try {
    const response = await request.public.get(
      `${HomeEndpoint.SEARCH}?page=${page}&size=${size}&q=${searchValue}`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getRecommendShopAPI = async (latitude, longitude) => {
  try {
    const response = await request.private.get(
      `${HomeEndpoint.RECOMMENDATION}?page=0&size=15&longitude=${longitude}&latitude=${latitude}&maxDistanceKms=5`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};
