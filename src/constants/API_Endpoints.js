export const AuthEndpoint = {
  REFRESH_TOKEN: '/v1/auth/refresh-token',
  CUSTOMER_REGISTER: '/v1/auth/register',
  LOGIN: '/v1/auth/login',
  LOGOUT: '/v1/auth/logout',
  SEND_OTP_CODE: '/v1/auth/otp',
  VERIFY_OTP_CODE: '/v1/auth/otp', //more when implement
};

export const HomeEndpoint = {
  GENERAL_SHOP_ENDPOINT: '/v1/shops',
  GET_CATEGORIES: '/v1/product-categories',
  GET_RES_BY_CATEGORY_ID: 'v1/shops/categories',
  GET_MENU_BY_SHOP_ID: 'v1/shop-brands',
  GENERAL_SHOP_CART_ENDPOINT: '/v1/shopcarts',
  PLACE_ORDER: '/v1/orders',
  SEARCH: '/v1/shops/search',
};

export const UserEndpoint = {
  GET_USER_ORDER: '/v1/orders/me',
  GENERAL_USER_FAVORITE: '/v1/users/favorite',
};

export const ProfileEndpoint = {
  AVATAR_UPLOAD_OPTIONS: '/v1/users/avatar/upload-options',
  LOG_OUT: '/v1/auth/logout',
};
