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
} from '../screens/profile';

import {
  SellerIntroScreen,
  RegisteredShopInfoScreen,
  SellerIdentificationScreen,
  RequestSentNotiScreen,
  SellerHomeScreen,
  ShopNavigationScreen,
  SellerOrderScreen,
  SellerRatingScreen,
  SellerRestaurantMenuScreen,
  SellerOrderDetailScreen,
  ShopCreationScreen,
  AddEditProductScreen,
  AddEditVoucherScreen,
} from '../screens/profile/seller';

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
      'SellerIntro_Screen',
      'RegisteredShopInfo_Screen',
      'SellerIdentification_Screen',
      'RequestSentNoti_Screen',
      'SellerHome_Screen',
      'ShopNavigation_Screen',
      'SellerOrder_Screen',
      'SellerRating_Screen',
      'SellerRestaurantMenu_Screen',
      'SellerOrderDetail_Screen',
      'ShopCreation_Screen',
      'AddEditProduct_Screen',
      'AddEditVoucher_Screen',
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

      {/*Seller Screens*/}
      <ProfileStack.Screen name="SellerIntro_Screen" component={SellerIntroScreen} />
      <ProfileStack.Screen name="RegisteredShopInfo_Screen" component={RegisteredShopInfoScreen} />
      <ProfileStack.Screen
        name="SellerIdentification_Screen"
        component={SellerIdentificationScreen}
      />
      <ProfileStack.Screen name="RequestSentNoti_Screen" component={RequestSentNotiScreen} />
      <ProfileStack.Screen name="SellerHome_Screen" component={SellerHomeScreen} />
      <ProfileStack.Screen name="ShopNavigation_Screen" component={ShopNavigationScreen} />
      <ProfileStack.Screen name="SellerOrder_Screen" component={SellerOrderScreen} />
      <ProfileStack.Screen name="SellerRating_Screen" component={SellerRatingScreen} />
      <ProfileStack.Screen
        name="SellerRestaurantMenu_Screen"
        component={SellerRestaurantMenuScreen}
      />
      <ProfileStack.Screen name="SellerOrderDetail_Screen" component={SellerOrderDetailScreen} />
      <ProfileStack.Screen name="ShopCreation_Screen" component={ShopCreationScreen} />
      <ProfileStack.Screen name="AddEditProduct_Screen" component={AddEditProductScreen} />
      <ProfileStack.Screen name="AddEditVoucher_Screen" component={AddEditVoucherScreen} />
    </ProfileStack.Navigator>
  );
}
