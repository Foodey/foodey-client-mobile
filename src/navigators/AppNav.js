import { React, useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from '~/navigators/IntroStackNavigator';
import AuthStackNavigator from '~/navigators/AuthStackNavigator';
import MainBottomTabNavigator from '~/navigators/MainBottomTabNavigator';

import MyAsyncStorage from '~/utils/MyAsyncStorage';
import StorageKey from '../constants/StorageKey';

import {
  MyVouchersScreen,
  VoucherDetailsScreen,
  EditAddressScreen,
  AddressScreen,
} from '~/screens/profile';

import SplashScreen from '~/screens/onBoarding/SplashScreen';

import { AppProvider, AppContext } from '~/contexts/AppContext';
import { ConfirmOrderScreen } from '../screens/discover';

const MainStack = createStackNavigator();

function AppNav() {
  const {
    accessToken,
    setAccessToken,
    setUserInfo,
    isAppFirstLaunch,
    setIsAppFirstLaunch,
    // setFavoriteRestaurants,
    // setFavoriteMeals,
    getPendingOrder,
    getDeliveredOrder,
    getFavoriteRestaurants,
  } = useContext(AppContext);

  const fetchUserData = async () => {
    await getPendingOrder();
    await getDeliveredOrder();
    await getFavoriteRestaurants();
  };

  //Check if the user has already logged in and getting data stored locally
  const isLoggedIn = async () => {
    try {
      let userInfo = await MyAsyncStorage.getItem(StorageKey.USER_INFO);
      let accessToken = await MyAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
      // let favoriteRestaurants = await MyAsyncStorage.getItem(StorageKey.FAVORITE_RESTAURANTS);
      // let favoriteMeals = await MyAsyncStorage.getItem(StorageKey.FAVORITE_MEALS);
      userInfo = JSON.parse(userInfo);
      // favoriteRestaurants = JSON.parse(favoriteRestaurants);
      // favoriteMeals = JSON.parse(favoriteMeals);

      if (userInfo && accessToken) {
        setAccessToken(accessToken);
        setUserInfo(userInfo);
        // setFavoriteRestaurants(favoriteRestaurants);
        // setFavoriteMeals(favoriteMeals);
        await fetchUserData();
      } else {
        setAccessToken('1');
      }
    } catch (e) {
      console.log('Is logged in error ' + e);
    }
  };

  //Check if the app is first launched
  useEffect(() => {
    async function fetchData() {
      const appData = await MyAsyncStorage.getItem(StorageKey.IS_FIRST_LAUNCH);
      if (appData == null) {
        setIsAppFirstLaunch(true);
        MyAsyncStorage.setItem(StorageKey.IS_FIRST_LAUNCH, 'false');
        setAccessToken('1');
      } else {
        setIsAppFirstLaunch(false);
        await isLoggedIn();
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

  //Official App Navigator
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

  // return <VoucherDetailsScreen />;
}

export default AppNav;
