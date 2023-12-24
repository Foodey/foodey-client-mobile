import { createStackNavigator } from '@react-navigation/stack';

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

export default function HomeStackNavigator() {
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
