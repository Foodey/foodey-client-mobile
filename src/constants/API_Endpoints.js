export const AuthEndpoint = {
  REFRESH_TOKEN: '/v1/auth/refresh-token',
  CUSTOMER_REGISTER: '/v1/auth/register',
  LOGIN: '/v1/auth/login',
  LOGOUT: '/v1/auth/logout',
  SEND_OTP_CODE: '/v1/auth/otp',
  VERIFY_OTP_CODE: '/v1/auth/otp', //more when implement
};

export const HomeEndpoint = {
  GET_CATEGORIES: '/v1/product-categories',
};
