import { React, useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from '~/navigators/IntroStackNavigator';
import AuthStackNavigator from '~/navigators/AuthStackNavigator';
import MainBottomTabNavigator from '~/navigators/MainBottomTabNavigator';

import {
  RestaurantMenuScreen,
  ProductDetailOrderScreen,
  CartScreen,
  ConfirmOrderScreen,
} from '~/screens/discover';
import SplashScreen from '~/screens/onBoarding/SplashScreen';

import { AppProvider, AppContext } from '~/contexts/AppContext';

const MainStack = createStackNavigator();

function AppNav() {
  const { accessToken, setAccessToken, setUserInfo, isAppFirstLaunch, setIsAppFirstLaunch } =
    useContext(AppContext);

  //Check if the user has already logged in
  const isLoggedIn = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      let accessToken = await AsyncStorage.getItem('accessToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setAccessToken(accessToken);
        setUserInfo(userInfo);
      } else {
        setAccessToken('1');
      }
    } catch (e) {
      console.log('Is logged in error ' + e);
    }
  };

  const fetchData = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunch');
    if (appData == null) {
      setIsAppFirstLaunch(true);
      AsyncStorage.setItem('isAppFirstLaunch', 'false');
    } else {
      setIsAppFirstLaunch(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
    fetchData();
  }, []);

  //Check if the app is first launched
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

  const handleRender = () => {
    if (accessToken === '') {
      return (
        <>
          <MainStack.Screen name="Splash_Screen" component={SplashScreen} />
        </>
      );
    } else if (accessToken === '1') {
      //accessToken = 1 when we want to navigate to the authenticate
      return (
        <>
          <MainStack.Screen name="Authenticate" component={AuthStackNavigator} />
          {/* <MainStack.Screen name="Main" component={MainBottomTabNavigator} /> */}
        </>
      );
    } else {
      return (
        <>
          <MainStack.Screen name="Main" component={MainBottomTabNavigator} />
        </>
      );
    }
  };

  return (
    isAppFirstLaunch !== null && (
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunch && <MainStack.Screen name="Intro" component={IntroStackNavigator} />}
          {handleRender()}
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

  // return <ConfirmOrderScreen />;
}

export default AppNav;
