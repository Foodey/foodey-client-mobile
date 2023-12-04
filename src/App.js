import { React, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from '~/navigators/IntroStackNavigator';
import AuthenticateStackNavigator from '~/screens/authenticate/SignInUpScreen';
import PhoneVerifyScreen from './screens/authenticate/PhoneVerifyScreen';

const MainStack = createStackNavigator();

function App() {
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const appData = await AsyncStorage.getItem('isAppFirstLaunch');
      if (appData == null) {
        setIsAppFirstLaunch(true);
        AsyncStorage.setItem('isAppFirstLaunch', 'false');
      } else {
        setIsAppFirstLaunch(false);
      }
    }
    fetchData();
  }, []);

  return (
    isAppFirstLaunch != null && (
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunch && <MainStack.Screen name="Intro" component={IntroStackNavigator} />}
          <MainStack.Screen name="Authenticate" component={AuthenticateStackNavigator} />
        </MainStack.Navigator>
      </NavigationContainer>
    )
  );
  // return (
  //   <NavigationContainer>
  //     <MainStack.Navigator screenOptions={{ headerShown: false }}>
  //       <MainStack.Screen name="PhoneVerify" component={PhoneVerifyScreen} />
  //     </MainStack.Navigator>
  //   </NavigationContainer>
  // );
}

export default App;
