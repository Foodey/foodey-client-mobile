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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    BASE_URL,
    isAppFirstLaunch,
    setIsAppFirstLaunch,
    setUserInfo,
    setAccessToken,
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
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';

    if (loginInputs.phoneNumber === '') {
      handleLoginErrors('* Please input phone number', 'phoneNumber');
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
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$';

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

    console.log('Before calling API');

    if (valid) signUp(signUpInputs.phoneNumber, signUpInputs.password, signUpInputs.fullName);
    // if(valid) navigation.navigate('PhoneVerify_Screen', { isForgotPassVerify: false });
  };

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/v1/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        let tempUserInfo = res.data;
        setUserInfo(tempUserInfo);
        setAccessToken(tempUserInfo.accessToken);

        AsyncStorage.setItem('userInfo', JSON.stringify(tempUserInfo));
        AsyncStorage.setItem('accessToken', tempUserInfo.accessToken);

        console.log(tempUserInfo);
        console.log('Access token ' + tempUserInfo.accessToken);

        handleLoginErrors('', 'phoneNumber');
        handleLoginErrors('', 'password');

        if (isAppFirstLaunch) setIsAppFirstLaunch(false);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          handleLoginErrors('   ', 'phoneNumber');
          handleLoginErrors('* Wrong phone number or password, please re-check', 'password');
        } else {
          console.log(err.response.status);
        }
        setIsLoading(false);
      });
  };

  const signUp = (username, password, name) => {
    setIsLoading(true);
    console.log('Calling API');
    axios
      .post(`${BASE_URL}/v1/auth/register/customers`, {
        username,
        password,
        name,
      })
      .then((res) => {
        console.log('Success');
        handleSignUpErrors('', 'confirmPassword');
        navigation.navigate('PhoneVerify_Screen', { isForgotPassVerify: false });
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          handleSignUpErrors('* Username already exists', 'phoneNumber');
        } else {
          console.log(err.response.status);
        }
        setIsLoading(false);
      });

    setIsLoading(false);
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
