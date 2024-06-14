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
    const response = await request.private.get(`${SellerEndpoint.SHOP}/brands/${brandID}`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const createNewBrandAPI = async (brandInputs) => {
  try {
    const response = await request.private.post(`${SellerEndpoint.BRAND}`, {
      name: brandInputs.brandName,
      phoneNumber: brandInputs.phoneNumber,
      email: brandInputs.email,
      logo: brandInputs.logoImage,
      wallpaper: brandInputs.wallpaperImage,
    });

    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const createNewShopAPI = async (
  brandID,
  brandLogo,
  brandWallpaper,
  shopName,
  shopAddress,
) => {
  try {
    const response = await request.private.post(`${SellerEndpoint.SHOP}`, {
      brandId: brandID,
      name: shopName,
      logo: brandLogo,
      wallpaper: brandWallpaper,
      address: shopAddress,
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
