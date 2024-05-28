import { createStackNavigator } from '@react-navigation/stack';

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
        // setOptions={{ tabBarVisible: false }}
      />
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
