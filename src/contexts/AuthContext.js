import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useState, useContext } from 'react';
import { AppContext } from './AppContext';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { BASE_URL, userInfo, setUserInfo, accessToken, setAccessToken, setIsLoading } =
    useContext(AppContext);

  //USE STATES
  const [systemOTPCode, setSystemOTPCode] = useState('123456');
  // const generateOTP = () => {
  //   Doing something for OTP;
  //   setSystemOTPCode(something);
  // }

  //  Login:
  const [loginInputs, setLoginInputs] = useState({
    phoneNumber: '',
    password: '',
  });

  const [loginErrorMessages, setLoginErrorMessages] = useState({
    phoneNumber: '',
    password: '',
  });

  //  SignUp:
  const [signUpInputs, setSignUpInputs] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [signUpErrorMessages, setSignUpErrorMessages] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  //    PhoneVerify:
  const [OTPCode, setOTPCode] = useState('');
  const [otpErrorMessage, setOTPErrorMessage] = useState('');

  //  ForgotPass:
  const [forgotPassInputs, setForgotPassInputs] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [forgotPassErrorMessages, setForgotPassErrorMessages] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  //FUNCTION:
  //    Login:
  const handleLoginInputsChanged = (text, input) => {
    setLoginInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleLoginErrors = (errorMessage, input) => {
    setLoginErrorMessages((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  //    SignUp
  const handleSignUpInputsChanged = (text, input) => {
    setSignUpInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSignUpErrors = (errorMessage, input) => {
    setSignUpErrorMessages((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  //  ForgotPass:
  const handleForgotPassInputsChanged = (text, input) => {
    setForgotPassInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleForgotPassErrors = (errorMessage, input) => {
    setForgotPassErrorMessages((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  //CLEAR INPUT FUNCTIONS:
  //  Login:
  const clearLoginInputs = () => {
    setLoginInputs({ phoneNumber: '', password: '' });
  };

  const clearLoginErrorMessages = () => {
    setLoginErrorMessages({ phoneNumber: '', password: '' });
  };

  //  SignUp:
  const clearSignUpInputs = () => {
    setSignUpInputs({ fullName: '', phoneNumber: '', password: '', confirmPassword: '' });
  };

  const clearSignUpErrorMessages = () => {
    setSignUpErrorMessages({ fullName: '', phoneNumber: '', password: '', confirmPassword: '' });
  };

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/v1/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        handleLoginErrors('', 'phoneNumber');
        handleLoginErrors('', 'password');

        console.log(res.data);
        let tempUserInfo = res.data;
        setUserInfo(tempUserInfo);
        setAccessToken(tempUserInfo.accessToken);

        // AsyncStorage.setItem('userInfo', JSON.stringify(tempUserInfo));
        // AsyncStorage.setItem('accessToken', tempUserInfo.accessToken);

        console.log(tempUserInfo);
        console.log('Access token ' + tempUserInfo.accessToken);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          handleLoginErrors('   ', 'phoneNumber');
          handleLoginErrors('* Wrong phone number or password, please re-check', 'password');
        } else {
          console.log(err.response.status);
        }
      });
  };

  const logout = () => {
    setAccessToken(null);
    // AsyncStorage.removeItem('userInfo');
    // AsyncStorage.removeItem('accessToken');
  };

  const isLoggedIn = async () => {
    try {
      // let userInfo = await AsyncStorage.getItem('userInfo');
      // let accessToken = await AsyncStorage.getItem('accessToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setAccessToken(accessToken);
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log('Is logged in error ' + e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        systemOTPCode,
        setSystemOTPCode,

        //Login
        loginInputs,
        setLoginInputs,
        loginErrorMessages,
        setLoginErrorMessages,
        handleLoginInputsChanged,
        handleLoginErrors,
        clearLoginInputs,
        clearLoginErrorMessages,
        login,

        //SignUp
        signUpInputs,
        setSignUpInputs,
        signUpErrorMessages,
        setSignUpErrorMessages,
        handleSignUpInputsChanged,
        handleSignUpErrors,
        clearSignUpInputs,
        clearSignUpErrorMessages,

        //PhoneVerify
        OTPCode,
        setOTPCode,
        otpErrorMessage,
        setOTPErrorMessage,

        //ForgotPass
        forgotPassInputs,
        setForgotPassInputs,
        forgotPassErrorMessages,
        setForgotPassErrorMessages,
        handleForgotPassInputsChanged,
        handleForgotPassErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
