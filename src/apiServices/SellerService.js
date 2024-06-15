import * as request from '~/utils/jwtRequests';
import { SellerEndpoint, HomeEndpoint } from '../constants/API_Endpoints';

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
    const response = await request.private.get(`${SellerEndpoint.SHOP}/brands/${brandID}`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const createNewBrandAPI = async (brandName, phoneNumber, email) => {
  try {
    const response = await request.private.post(`${SellerEndpoint.BRAND_CREATION}`, {
      name: brandName,
      phoneNumber: phoneNumber,
      email: email,
    });

    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const createNewShopAPI = async (
  brandID,
  shopName,
  shopDetailsAddress,
  shopLatitude,
  shopLongitude,
) => {
  try {
    const response = await request.private.post(`${SellerEndpoint.SHOP_CREATION}`, {
      brandId: brandID,
      name: shopName,
      address: {
        detailsAddress: shopDetailsAddress,
        latitude: shopLatitude,
        longitude: shopLongitude,
      },
    });

    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getShopOrderByOrderStatusAPI = async (shopID, orderStatus) => {
  try {
    const response = await request.private.get(
      `${SellerEndpoint.SHOP_ORDER}/${shopID}?status=${orderStatus}`,
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const addNewProductAPI = async (brandID, shopID, categoryID, name, description, price) => {
  try {
    const response = await request.private.post(
      `${SellerEndpoint.BRAND_CREATION}/${brandID}/shops/${shopID}/menu/products?appliedToAllShops=false`,
      {
        name: name,
        categoryId: categoryID,
        description: description,
        price: price,
      },
    );
    return response;
  } catch (err) {
    console.log(err.response);
  }
};
