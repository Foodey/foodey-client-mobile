import { React, useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from '~/navigators/IntroStackNavigator';
import AuthStackNavigator from '~/navigators/AuthStackNavigator';
import MainBottomTabNavigator from '~/navigators/MainBottomTabNavigator';

import { RestaurantMenuScreen } from '~/screens/discover';

import { AppProvider, AppContext } from '~/contexts/AppContext';

const MainStack = createStackNavigator();

function AppNav() {
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

  const { accessToken, isLoading } = useContext(AppContext);

  if (isLoading) {
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isAppFirstLaunch && <MainStack.Screen name="Intro" component={IntroStackNavigator} />}
        {accessToken !== null ? (
          <MainStack.Screen name="Main" component={MainBottomTabNavigator} />
        ) : (
          <MainStack.Screen name="Authenticate" component={AuthStackNavigator} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
  //       <MainStack.Screen name="Main" component={MainBottomTabNavigator} />
  //     </MainStack.Navigator>
  //   </NavigationContainer>
  // );

  // return <RestaurantMenuScreen />;
}

export default AppNav;
