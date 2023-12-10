import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
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
