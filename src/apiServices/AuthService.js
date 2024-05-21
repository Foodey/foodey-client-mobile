import * as request from '~/utils/jwtRequests';
import { AuthEndpoint } from '~/constants/API_Endpoints';
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

// export const sendingOTPCodeAPI = async (phoneNumber) => {
//     try{
//       const response = await request.public

//     } catch(err){
//         return err.response;
//     }
// }
