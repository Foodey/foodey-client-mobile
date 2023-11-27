import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import Style from '~/screens/authenticate/SignInUpStyle';
import { UtilityCard } from '~/components';
import { AuthSwitcher, InputBox, PasswordBox } from '~/components/authenticate';
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
      <UtilityCard
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
      <View style={Style.auth_section_container}>
        <InputBox
          title="Email"
          errorMessage="The phone number is invalid"
          style={{ marginBottom: 6 }}
        />
        <PasswordBox
          title="Password"
          errorMessage="The phone number is invalid"
          style={{ marginBottom: 6 }}
        />
      </View>
      <View style={Style.third_party_container}></View>
      <View style={Style.footer_container}></View>
    </SafeAreaView>
  );
}
