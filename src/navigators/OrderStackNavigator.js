import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { COLOR } from '../constants/Colors';

import { ViewOnlyConfirmOrderScreen, OrderScreen, RatingScreen } from '../screens/order';

const OrderStack = createStackNavigator();

export default function OrderStackNavigator({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = ['ViewOnlyConfirmOrder_Screen', 'Rating_Screen'];
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
    <OrderStack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Order_Screen"
    >
      <OrderStack.Screen name="Order_Screen" component={OrderScreen} />
      <OrderStack.Screen
        name="ViewOnlyConfirmOrder_Screen"
        component={ViewOnlyConfirmOrderScreen}
      />
      <OrderStack.Screen name="Rating_Screen" component={RatingScreen} />
    </OrderStack.Navigator>
  );
}
