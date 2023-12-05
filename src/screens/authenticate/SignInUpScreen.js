import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import React from 'react';
import { UtilityCard, SubmitButton } from '~/components';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';

export default function SignInUpScreen({ navigation }) {
  //NAVIGATORS:
  const onLoginPressHandler = () => {
    // navigation.navigate('Home_Screen');
    console.log('Navigate to the Home Screen');
  };

  const onNextPressHandler = () => {
    navigation.navigate('PhoneVerify_Screen');
  };

  //USE STATES
  const [isLogin, setIsLogin] = useState(true);

  const ToggleLogin = () => {
    if (!isLogin) setIsLogin(!isLogin);
  };

  const ToggleSignUp = () => {
    if (isLogin) setIsLogin(!isLogin);
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
      <View style={styles.auth_section_container}>{isLogin ? <Login /> : <SignUp />}</View>
      <View style={styles.third_party_container}>
        <ThirdPartyAuth
          title={isLogin ? 'Login' : 'Sign Up'}
          lineStyle={isLogin ? { marginStart: 0 } : { marginStart: 16 }}
        />
      </View>
      <View style={styles.footer_container}>
        <SubmitButton
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
