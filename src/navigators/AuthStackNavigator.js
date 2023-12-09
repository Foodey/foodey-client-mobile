import { createStackNavigator } from '@react-navigation/stack';

import SignInUpScreen from '~/screens/authenticate/SignInUpScreen';
import PhoneVerifyScreen from '~/screens/authenticate/PhoneVerifyScreen';
import ForgotPassScreen from '~/screens/authenticate/ForgotPassScreen';
import ResetPassScreen from '~/screens/authenticate/ResetPassScreen';

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
      </AuthStack.Navigator>
    </AuthProvider>
  );
}
