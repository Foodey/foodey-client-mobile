import { createStackNavigator } from '@react-navigation/stack';
import { COLOR } from '../constants/Colors';
import { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
  HomeScreen,
  OfferNearByScreen,
  NewTrendingScreen,
  CategoriesScreen,
  SearchResultScreen,
  CategoryDetailScreen,
} from '~/screens/home';

import {
  RestaurantMenuScreen,
  ProductDetailOrderScreen,
  ConfirmOrderScreen,
} from '~/screens/discover';

import { HomeProvider } from '~/contexts/HomeContext';

const HomeStack = createStackNavigator();

export default function HomeStackNavigator({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      'OfferNearBy_Screen',
      'NewTrending_Screen',
      'Categories_Screen',
      'SearchResult_Screen',
      'CategoryDetail_Screen',
      'RestaurantMenu_Screen',
      'ProductDetailOrder_Screen',
      'ConfirmOrder_Screen',
    ];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: COLOR.input_background_color,
          height: 88,
          paddingLeft: 8,
          paddingRight: 8,
        },
      });
    }
  }, [navigation, route]);

  return (
    <HomeProvider>
      <HomeStack.Navigator
        screenOptions={{
          header: () => null,
        }}
        initialRouteName="Home_Screen"
      >
        <HomeStack.Screen name="Home_Screen" component={HomeScreen} />
        <HomeStack.Screen name="OfferNearBy_Screen" component={OfferNearByScreen} />
        <HomeStack.Screen name="NewTrending_Screen" component={NewTrendingScreen} />
        <HomeStack.Screen name="Categories_Screen" component={CategoriesScreen} />
        <HomeStack.Screen name="SearchResult_Screen" component={SearchResultScreen} />
        <HomeStack.Screen name="CategoryDetail_Screen" component={CategoryDetailScreen} />
        <HomeStack.Screen name="RestaurantMenu_Screen" component={RestaurantMenuScreen} />
        <HomeStack.Screen name="ProductDetailOrder_Screen" component={ProductDetailOrderScreen} />
        <HomeStack.Screen name="ConfirmOrder_Screen" component={ConfirmOrderScreen} />
      </HomeStack.Navigator>
    </HomeProvider>
  );
}
