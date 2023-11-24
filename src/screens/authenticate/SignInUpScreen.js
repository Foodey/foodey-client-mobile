import { View, Text } from 'react-native';
import React from 'react';
import Style from '~/screens/authenticate/SignInUpStyle';
import { UtilityCard } from '~/components';
import { AuthSwitcher } from '~/components/authenticate';

export default function SignInUpScreen({ navigation }) {
  return (
    <View style={Style.container}>
      <UtilityCard
        title="Welcome!"
        title_style={{ marginBottom: 0 }}
        content="Sign up or Login to your Account"
      />
      <AuthSwitcher style={Style.switcher_container} />
      <View style={Style.auth_section_container}></View>
      <View style={Style.footer_container}></View>
    </View>
  );
}
