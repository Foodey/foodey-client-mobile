import { createStackNavigator } from '@react-navigation/stack';

import {
  RestaurantMenuScreen,
  ProductDetailOrderScreen,
  ConfirmOrderScreen,
} from '~/screens/discover';

import { OrderScreen } from '~/screens/order';

const OrderStack = createStackNavigator();

export default function OrderStackNavigator() {
  return (
    <OrderStack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Order_Screen"
    >
      <OrderStack.Screen name="Order_Screen" component={OrderScreen} />
      <OrderStack.Screen name="ConfirmOrder_Screen" component={ConfirmOrderScreen} />
    </OrderStack.Navigator>
  );
}
