import { View, Text } from 'react-native';
import React from 'react';
import Style from '~/styles/SignInUpStyle';
import UtilityCard from '~/components/UtilityCard';

export default function SignInUpScreen({ navigation }) {
  return (
    <View style={Style.container}>
      <UtilityCard
        title="Welcome!"
        title_style={{ marginBottom: 0 }}
        content="Sign up or Login to your Account"
      />
    </View>
  );
}
