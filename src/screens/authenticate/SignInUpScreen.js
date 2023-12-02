import { View, SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { UtilityCard, SubmitButton } from '~/components';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
    height: 300,
  },

  footer_container: {
    height: 100,
  },
});
