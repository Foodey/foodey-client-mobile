import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingScreen1 from '../screens/onBoarding/OnBoardingScreen1';
import OnBoardingScreen2 from '../screens/onBoarding/OnBoardingScreen2';
import OnBoardingScreen3 from '../screens/onBoarding/OnBoardingScreen3';

const IntroStack = createStackNavigator();

export default function IntroStackNavigator() {
  return (
    <IntroStack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <IntroStack.Screen name="OnBoardingScreen_1" component={OnBoardingScreen1} />
      <IntroStack.Screen name="OnBoardingScreen_2" component={OnBoardingScreen2} />
      <IntroStack.Screen name="OnBoardingScreen_3" component={OnBoardingScreen3} />
    </IntroStack.Navigator>
  );
}
