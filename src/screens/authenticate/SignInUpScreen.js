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
import { AuthSwitcher, Login, SignUp } from '~/components/authenticate';
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
      <StatusBar backgroundColor={COLOR.background_color} />
      <ScrollView style={{ flex: 1 }}>
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
        <View style={Style.third_party_container}></View>
        <View style={Style.footer_container}>
          <SubmitButton
            style={{ flex: 1 }}
            title="Login"
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
