const AuthEndpoint = {
  REFRESH_TOKEN: '/api/v1/auth/refresh-token',
  CUSTOMER_REGISTER: '/v1/auth/register/customers',
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  SEND_OTP_CODE: '/api/v1/auth/sms/otp',
  VERIFY_OTP_CODE: '/api/v1/auth/sms/otp/verification',
};

export default AuthEndpoint;
