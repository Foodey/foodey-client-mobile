import { createStackNavigator } from '@react-navigation/stack';

import SignInUpScreen from '~/screens/authenticate/SignInUpScreen';
import PhoneVerifyScreen from '~/screens/authenticate/PhoneVerifyScreen';

const AuthStack = createStackNavigator();

export default function IntroStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <AuthStack.Screen name="SignInUp_Screen" component={SignInUpScreen} />
      <AuthStack.Screen name="PhoneVerify_Screen" component={PhoneVerifyScreen} />
    </AuthStack.Navigator>
  );
}
