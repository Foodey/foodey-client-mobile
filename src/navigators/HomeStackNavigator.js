import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  OfferNearByScreen,
  NewTrendingScreen,
  CategoriesScreen,
  SearchResultScreen,
  CategoryDetailScreen,
} from '~/screens/home';

const HomeStack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
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
    </HomeStack.Navigator>
  );
}
