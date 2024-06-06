import { createStackNavigator } from '@react-navigation/stack';

import { ViewOnlyConfirmOrderScreen, OrderScreen } from '../screens/order';

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
      <OrderStack.Screen
        name="ViewOnlyConfirmOrder_Screen"
        component={ViewOnlyConfirmOrderScreen}
      />
    </OrderStack.Navigator>
  );
}
