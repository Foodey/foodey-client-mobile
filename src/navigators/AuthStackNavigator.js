import { createStackNavigator } from '@react-navigation/stack';

import {
  SignInUpScreen,
  PhoneVerifyScreen,
  ForgotPassScreen,
  ResetPassScreen,
  SignUpPasskeyScreen,
} from '~/screens/authenticate';

import { AuthProvider } from '~/contexts/AuthContext';

const AuthStack = createStackNavigator();

export default function IntroStackNavigator() {
  return (
    <AuthProvider>
      <AuthStack.Navigator
        screenOptions={{
          header: () => null,
        }}
      >
        <AuthStack.Screen name="SignInUp_Screen" component={SignInUpScreen} />
        <AuthStack.Screen name="PhoneVerify_Screen" component={PhoneVerifyScreen} />
        <AuthStack.Screen name="ForgotPass_Screen" component={ForgotPassScreen} />
        <AuthStack.Screen name="ResetPass_Screen" component={ResetPassScreen} />
        <AuthStack.Screen name="SignUpPasskey_Screen" component={SignUpPasskeyScreen} />
      </AuthStack.Navigator>
    </AuthProvider>
  );
}
