import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //USE STATES
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
        loginInputs,
        setLoginInputs,
        loginErrorMessages,
        setLoginErrorMessages,
        handleLoginInputsChanged,
        handleLoginErrors,
        clearLoginInputs,
        clearLoginErrorMessages,

        signUpInputs,
        setSignUpInputs,
        signUpErrorMessages,
        setSignUpErrorMessages,
        handleSignUpInputsChanged,
        handleSignUpErrors,
        clearSignUpInputs,
        clearSignUpErrorMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
