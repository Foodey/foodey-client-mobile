import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { UtilityCard, SubmitButton } from '~/components';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { COLOR } from '~/constants/Colors';
import { AuthContext } from '~/contexts/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppContext } from '../../contexts/AppContext';
import axios, { HttpStatusCode } from 'axios';

import MyAsyncStorage from '~/utils/MyAsyncStorage';
import StorageKey from '../../constants/StorageKey';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import { loginAPI, signUpAPI } from '~/apiServices/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInUpScreen({ navigation }) {
  const {
    loginInputs,
    loginErrorMessages,
    handleLoginErrors,
    clearLoginInputs,
    clearLoginErrorMessages,

    signUpInputs,
    signUpErrorMessages,
    handleSignUpErrors,
    clearSignUpInputs,
    clearSignUpErrorMessages,
  } = useContext(AuthContext);

  const {
    isLoading,
    setIsLoading,
    isAppFirstLaunch,
    setIsAppFirstLaunch,
    setUserInfo,
    setAccessToken,
    getFavoriteRestaurants,
    // getFavoriteMeals,
  } = useContext(AppContext);

  //USE STATES
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(true);
  }, []);

  //Navigation:
  const onForgotPassPress = () => {
    navigation.navigate('ForgotPass_Screen');
  };

  //Functions:
  //  Login:
  const onLoginPressHandler = () => {
    let valid = true;
    const phoneRegex = '^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$';
    const passwordRegex =
      // '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';
      '^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{8,}$';

    if (loginInputs.phoneNumber === '') {
      handleLoginErrors('* Please input phone number', 'oneNumber');
      valid = false;
    } else if (!loginInputs.phoneNumber.match(phoneRegex)) {
      handleLoginErrors('* Invalid phone number format', 'phoneNumber');
      valid = false;
    }

    if (loginInputs.password === '') {
      handleLoginErrors('* Please input password', 'password');
      valid = false;
    } else if (!loginInputs.password.match(passwordRegex)) {
      handleLoginErrors(
        '* Password must be between 8 and 20 characters and at least one uppercase letter, one' +
          ' lowercase letter, one number and one special character',
        'password',
      );
      valid = false;
    }

    if (valid) login(loginInputs.phoneNumber, loginInputs.password);
  };

  //  SignUp:
  const onNextPressHandler = () => {
    let valid = true;
    const phoneRegex = '^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$';
    const passwordRegex =
      // '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';
      '^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{8,}$';

    if (signUpInputs.fullName === '') {
      handleSignUpErrors('* Please input your full name', 'fullName');
      valid = false;
    } else if (signUpInputs.fullName.length > 255 || signUpInputs.fullName.length < 3) {
      handleSignUpErrors(
        '* Full name must be at least 3 characters and less than 255 characters',
        'fullName',
      );
      valid = false;
    }

    if (signUpInputs.phoneNumber === '') {
      handleSignUpErrors('* Please input phone number', 'phoneNumber');
      valid = false;
    } else if (!signUpInputs.phoneNumber.match(phoneRegex)) {
      handleSignUpErrors('* Invalid phone number format', 'phoneNumber');
      valid = false;
    }

    if (signUpInputs.password === '') {
      handleSignUpErrors('* Please input password', 'password');
      valid = false;
    } else if (!signUpInputs.password.match(passwordRegex)) {
      handleSignUpErrors(
        '* Password must be between 8 and 20 characters and at least one uppercase letter, one' +
          ' lowercase letter, one number and one special character',
        'password',
      );
      valid = false;
    }

    if (signUpInputs.confirmPassword === '') {
      handleSignUpErrors('* Please input confirm password', 'confirmPassword');
      valid = false;
    } else if (signUpInputs.confirmPassword !== signUpInputs.password) {
      handleSignUpErrors('* Confirm password does not match the password', 'confirmPassword');
      valid = false;
    }

    if (valid) signUp(signUpInputs.phoneNumber, signUpInputs.password, signUpInputs.fullName);
    // if(valid) navigation.navigate('PhoneVerify_Screen', { isForgotPassVerify: false });
  };

  const login = async (phoneNumber, password) => {
    setIsLoading(true);
    try {
      const response = await loginAPI({ phoneNumber: phoneNumber, password: password });

      if (response.status === HTTPStatus.OK) {
        const tempUserInfo = response?.data;

        MyAsyncStorage.setItem(StorageKey.USER_INFO, JSON.stringify(tempUserInfo));
        MyAsyncStorage.setItem(StorageKey.ACCESS_TOKEN, tempUserInfo.jwt.accessToken);
        MyAsyncStorage.setItem(StorageKey.REFRESH_TOKEN, tempUserInfo.jwt.refreshToken);
        await getFavoriteRestaurants();
        // await getFavoriteMeals();
        setUserInfo(tempUserInfo);
        setAccessToken(tempUserInfo.jwt.accessToken);

        handleLoginErrors('', 'phoneNumber');
        handleLoginErrors('', 'password');

        if (isAppFirstLaunch) setIsAppFirstLaunch(false);
        setIsLoading(false);
      } else if (response.status === HTTPStatus.EXPECTATION_FAILED) {
        handleLoginErrors('   ', 'phoneNumber');
        handleLoginErrors('* Wrong phone number or password, please re-check', 'password');
      } else {
        handleLoginErrors('   ', 'phoneNumber');
        handleLoginErrors('* Unexpected server error, please try again', 'password');
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const signUp = async (phoneNumber, password, name) => {
    setIsLoading(true);

    try {
      const response = await signUpAPI({
        phoneNumber: phoneNumber,
        password: password,
        name: name,
      });

      if (response.status === HTTPStatus.NO_CONTENT) {
        handleSignUpErrors('', 'confirmPassword');
        setIsLoading(false);
        navigation.navigate('PhoneVerify_Screen', { isForgotPassVerify: false });
      } else if (response.status === HTTPStatus.CONFLICT) {
        handleSignUpErrors(
          '* Phone number already been used, please use another one',
          'phoneNumber',
        );
      } else {
        handleSignUpErrors('* Unexpected server error, please try again later', 'phoneNumber');
        handleSignUpErrors(' ', 'fullName');
        handleSignUpErrors(' ', 'password');
        handleSignUpErrors(' ', 'confirmPassword');
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  //  General:

  const looseFocus = () => {
    Keyboard.dismiss();
  };

  const ToggleLogin = () => {
    if (!isLogin) setIsLogin(!isLogin);
    clearSignUpInputs();
    clearSignUpErrorMessages();
  };

  const ToggleSignUp = () => {
    if (isLogin) setIsLogin(!isLogin);
    clearLoginInputs();
    clearLoginErrorMessages();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <Spinner visible={isLoading} />
      <UtilityCard
        style={styles.header_content_container}
        title="Welcome!"
        title_style={{ marginBottom: 0 }}
        content="Sign up or Login to your Account"
      />
      <AuthSwitcher
        style={styles.switcher_container}
        isLogin={isLogin}
        onLoginPress={ToggleLogin}
        onSignUpPress={ToggleSignUp}
      />
      <View style={styles.auth_section_container}>
        {/* <TouchableWithoutFeedback onPress={looseFocus}>
          {isLogin ? <Login onForgotPassPress={onForgotPassPress} /> : <SignUp />}
        </TouchableWithoutFeedback> */}
        {isLogin ? <Login onForgotPassPress={onForgotPassPress} /> : <SignUp />}
      </View>
      <View style={styles.third_party_container}>
        <TouchableWithoutFeedback onPress={looseFocus}>
          <ThirdPartyAuth title={isLogin ? 'Login' : 'Sign Up'} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.footer_container}>
        <SubmitButton
          showIcon={true}
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 42 }}
          title={isLogin ? 'Login' : 'Next'}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={isLogin ? onLoginPressHandler : onNextPressHandler}
          // onPressFunction={test}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_content_container: {
    flex: 1,
    marginHorizontal: 21,
  },

  switcher_container: {
    flex: 1,
    marginHorizontal: 21,
  },

  auth_section_container: {
    flex: 3,
    marginHorizontal: 21,
  },

  third_party_container: {
    flex: 2,
  },

  footer_container: {
    flex: 1,
  },
});
