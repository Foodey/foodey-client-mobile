import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { COLOR } from '../constants/Colors';

import {
  ProfileScreen,
  MyVouchersScreen,
  VoucherDetailsScreen,
  AddressScreen,
  AddEditAddressScreen,
  PolicyScreen,
  SettingScreen,
  ContactInfoScreen,
  PassChangeScreen,
  AccountDeletionScreen,
} from '~/screens/profile';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      'MyVouchers_Screen',
      'VoucherDetails_Screen',
      'Address_Screen',
      'AddEditAddress_Screen',
      'Policy_Screen',
      'Setting_Screen',
      'ContactInfo_Screen',
      'PassChange_Screen',
      'AccountDeletion_Screen',
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
    <ProfileStack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Profile_Screen"
    >
      <ProfileStack.Screen name="Profile_Screen" component={ProfileScreen} />
      <ProfileStack.Screen name="MyVouchers_Screen" component={MyVouchersScreen} />
      <ProfileStack.Screen name="VoucherDetails_Screen" component={VoucherDetailsScreen} />
      <ProfileStack.Screen name="Address_Screen" component={AddressScreen} />
      <ProfileStack.Screen name="AddEditAddress_Screen" component={AddEditAddressScreen} />
      <ProfileStack.Screen name="Policy_Screen" component={PolicyScreen} />
      <ProfileStack.Screen name="Setting_Screen" component={SettingScreen} />
      <ProfileStack.Screen name="ContactInfo_Screen" component={ContactInfoScreen} />
      <ProfileStack.Screen name="PassChange_Screen" component={PassChangeScreen} />
      <ProfileStack.Screen name="AccountDeletion_Screen" component={AccountDeletionScreen} />
    </ProfileStack.Navigator>
  );
}
