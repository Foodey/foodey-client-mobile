import { createStackNavigator } from '@react-navigation/stack';

import { FavoriteScreen, ViewOnlyConfirmOrderScreen } from '../screens/favorite';

const FavoriteStack = createStackNavigator();

export default function FavoriteStackNavigator() {
  return (
    <FavoriteStack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Favorite_Screen"
    >
      <FavoriteStack.Screen name="Favorite_Screen" component={FavoriteScreen} />
    </FavoriteStack.Navigator>
  );
}
