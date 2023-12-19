import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  Keyboard,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { UtilityCard, SubmitButton } from '~/components';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { COLOR } from '~/constants/Colors';
import { AuthContext } from '~/contexts/AuthContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function SignInUpScreen({ navigation }) {
  const tempAccount = { phoneNumber: '0123456789', password: '12345678' };

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

  //USE STATES
  const [isLogin, setIsLogin] = useState(true);

  //Navigation:
  const onForgotPassPress = () => {
    navigation.navigate('ForgotPass_Screen');
  };

  //Functions:
  //  Login:
  const onLoginPressHandler = () => {
    let valid = true;

    if (loginInputs.phoneNumber === '') {
      handleLoginErrors('* Please input phone number', 'phoneNumber');
      valid = false;
    }
    // else if (!loginInputs.phoneNumber.match('^(+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])d{7,9}$'))
    // {
    //   handleLoginErrors('* Invalid phone number format', 'phoneNumber');
    //   valid = false;
    // }

    if (loginInputs.password === '') {
      handleLoginErrors('* Please input password', 'password');
      valid = false;
    } else if (loginInputs.password.length < 8 || loginInputs.password.length > 30) {
      handleLoginErrors(
        '* Password must be at least 8 characters and maximum of 30 characters',
        'password',
      );
      valid = false;
    }

    if (valid) login();
  };

  const login = () => {
    //**Communicate with BE to authenticate the account**
    if (
      loginInputs.phoneNumber === tempAccount.phoneNumber &&
      loginInputs.password === tempAccount.password
    ) {
      clearLoginErrorMessages();
      navigation.replace('Main');
    } else handleLoginErrors('* Incorrect phone number or password', 'password');
  };

  //  SignUp:
  const onNextPressHandler = () => {
    let valid = true;

    if (signUpInputs.fullName === '') {
      handleSignUpErrors('* Please input your full name', 'fullName');
      valid = false;
    } else if (signUpInputs.fullName.length > 255) {
      handleSignUpErrors('* Full name must be less than 255 characters', 'fullName');
      valid = false;
    }

    if (signUpInputs.phoneNumber === '') {
      handleSignUpErrors('* Please input phone number', 'phoneNumber');
      valid = false;
    }
    // else if (!signUpInputs.phoneNumber.match('^(+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])d{7,9}$'))
    // {
    //   handleSignUpErrors('* Invalid phone number format', 'phoneNumber');
    //   valid = false;
    // }

    if (signUpInputs.password === '') {
      handleSignUpErrors('* Please input password', 'password');
      valid = false;
    } else if (signUpInputs.password.length < 8 || signUpInputs.password.length > 30) {
      handleSignUpErrors(
        '* Password must be at least 8 characters and maximum of 30 characters',
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

    if (valid) signUp();
  };

  const signUp = () => {
    handleSignUpErrors('', 'confirmPassword');
    navigation.navigate('PhoneVerify_Screen', { isForgotPassVerify: false });
  };

  //  General:

  const looseFocus = () => {
    Keyboard.dismiss();
  };

  const ToggleLogin = () => {
    if (!isLogin) setIsLogin(!isLogin);
    clearLoginInputs();
    clearLoginErrorMessages();
  };

  const ToggleSignUp = () => {
    if (isLogin) setIsLogin(!isLogin);
    clearSignUpInputs();
    clearSignUpErrorMessages();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
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
