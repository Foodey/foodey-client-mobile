import { React, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from '~/navigators/IntroStackNavigator';
import AuthStackNavigator from '~/navigators/AuthStackNavigator';

import MainBottomTabNavigator from './navigators/MainBottomTabNavigator';

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
          <MainStack.Screen name="Authenticate" component={AuthStackNavigator} />
        </MainStack.Navigator>
      </NavigationContainer>
    )
  );

  // return (
  //   <NavigationContainer>
  //     <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
  //       <MainStack.Screen name="Main" component={MainBottomTabNavigator} />
  //     </MainStack.Navigator>
  //   </NavigationContainer>
  // );
}

export default App;
