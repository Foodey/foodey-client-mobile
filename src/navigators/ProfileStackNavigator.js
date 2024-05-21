import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen, MyVouchersScreen, VoucherDetailsScreen } from '~/screens/profile';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Profile_Screen"
    >
      <ProfileStack.Screen name="Profile_Screen" component={ProfileScreen} />
      <ProfileStack.Screen
        name="MyVouchers_Screen"
        component={MyVouchersScreen}
        setOptions={{ tabBarVisible: false }}
      />
      <ProfileStack.Screen name="VoucherDetails_Screen" component={VoucherDetailsScreen} />
    </ProfileStack.Navigator>
  );
}
