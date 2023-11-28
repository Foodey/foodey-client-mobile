import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Style from '~/screens/authenticate/SignInUpStyle';
import { UtilityCard } from '~/components';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';

export default function SignInUpScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);

  const ToggleLogin = () => {
    if (!isLogin) setIsLogin(!isLogin);
  };

  const ToggleSignUp = () => {
    if (isLogin) setIsLogin(!isLogin);
  };

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UtilityCard
          style={Style.header_content_container}
          title="Welcome!"
          title_style={{ marginBottom: 0 }}
          content="Sign up or Login to your Account"
        />
        <AuthSwitcher
          style={Style.switcher_container}
          isLogin={isLogin}
          onLoginPress={ToggleLogin}
          onSignUpPress={ToggleSignUp}
        />
        <View style={Style.auth_section_container}>{isLogin ? <Login /> : <SignUp />}</View>
        <View style={Style.third_party_container}>
          <ThirdPartyAuth
            title={isLogin ? 'Login' : 'Sign Up'}
            lineStyle={isLogin ? { marginStart: 0 } : { marginStart: 16 }}
          />
        </View>
        <View style={Style.footer_container}>
          <SubmitButton
            style={{ flex: 1, margin: 21 }}
            title={isLogin ? 'Login' : 'Next'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
