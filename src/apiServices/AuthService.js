import * as request from '~/utils/jwtRequests';
import { AuthEndpoint } from '../constants/API_Endpoints';
import MyAsyncStorage from '~/utils/MyAsyncStorage';

export const loginAPI = async (data) => {
  try {
    const response = await request.public.post(AuthEndpoint.LOGIN, data);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const signUpAPI = async (data) => {
  try {
    const response = await request.public.post(AuthEndpoint.CUSTOMER_REGISTER, data);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const sendingOTPCodeAPI = async (phoneNumber) => {
  try {
    const response = await request.public.post(`${AuthEndpoint.SEND_OTP_CODE}/${phoneNumber}`, {
      notificationType: 'SMS',
      ttl: 100,
      otpExpiration: 'SHORT',
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const verifyOTPCodeAPI = async (phoneNumber, OTPcode) => {
  try {
    const response = await request.public.post(
      `${AuthEndpoint.VERIFY_OTP_CODE}/${phoneNumber}/validation/${OTPcode}`,
      {
        notificationType: 'SMS',
        ttl: 100,
        otpExpiration: 'SHORT',
      },
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
