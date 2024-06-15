import { View, Text, Pressable, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import React, { useContext, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { Discount, Wallet, FillLocation, Note, Setting, Store } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';
import { LocationDisplay } from '../../components/home';
import { ConfirmActionModal } from '../../components/messageBoxes';
import { getUserRoleAPI } from '../../apiServices/UserService';
import HTTPStatus from '../../constants/HTTPStatusCodes';

const ProfileScreen = ({ navigation }) => {
  const { logout, userInfo, userRole, getUserRole } = useContext(AppContext);
  const [isConfirmLogoutVisible, setConfirmLogoutVisible] = useState(false);
  const [role, setRole] = useState([]);

  const onLogoutOKPress = async () => {
    setConfirmLogoutVisible(false);
    await logout();
  };

  const getRole = async () => {
    try {
      const response = await getUserRoleAPI();
      if (response.status === HTTPStatus.OK) {
        // console.log('Pending Order: ' + response.data.content);
        setRole(response.data);
        return response.data;
      } else {
        console.log('Unexpected error when fetching user pending order');
        return null;
      }
    } catch (err) {
      console.log('Unexpected error when fetching user pending order ' + err);
      return null;
    }
  };

  const onMyVouchersPress = () => {
    navigation.navigate('MyVouchers_Screen');
  };

  const onAddressPress = () => {
    navigation.navigate('Address_Screen');
  };

  const onPolicyPress = () => {
    navigation.navigate('Policy_Screen');
  };

  const onSettingPress = () => {
    navigation.navigate('Setting_Screen');
  };

  const onMyStorePress = async () => {
    const role = await getRole();
    if (role) {
      const isSeller = role.some((role) => role.name === 'SELLER'); //Getting the user role later thru API
      if (isSeller) {
        navigation.navigate('SellerBrandList_Screen');
      } else {
        navigation.navigate('SellerIntro_Screen');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={isConfirmLogoutVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color}
      />
      <ConfirmActionModal
        visible={isConfirmLogoutVisible}
        title="Log out"
        content="Do you want to log out Foodey?"
        onCancelPress={() => {
          setConfirmLogoutVisible(false);
        }}
        onOKPress={onLogoutOKPress}
      />
      <Text style={styles.header_text}>Profile</Text>
      <View style={{ flex: 1.25, justifyContent: 'center' }}>
        <View style={styles.header_container}>
          <Image
            source={{ uri: 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
            style={styles.avatar}
          />
          <Text style={styles.user_name_text}>{userInfo.name}</Text>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <Pressable style={styles.section_container}>
          <Text style={[styles.section_text, { fontSize: 23, color: COLOR.text_blue_color }]}>
            Personal Information
          </Text>
        </Pressable>
        <Pressable style={styles.section_container} onPress={onMyVouchersPress}>
          <Discount
            width={26}
            height={26}
            style={{ color: COLOR.text_blue_color, marginStart: 10 }}
          />
          <Text style={styles.section_text}>My Vouchers</Text>
          <ArrowRight
            width={24}
            height={24}
            style={{ color: COLOR.text_secondary_color, marginLeft: 'auto', marginEnd: 5 }}
          />
        </Pressable>
        {/* <Pressable style={styles.section_container}>
          <Wallet
            width={26}
            height={26}
            style={{ color: COLOR.text_blue_color, marginStart: 10 }}
          />
          <Text style={styles.section_text}>Payment</Text>
          <ArrowRight
            width={24}
            height={24}
            style={{ color: COLOR.text_secondary_color, marginLeft: 'auto', marginEnd: 5 }}
          />
        </Pressable> */}
        <Pressable style={styles.section_container} onPress={onAddressPress}>
          <FillLocation
            width={26}
            height={26}
            style={{ color: COLOR.text_blue_color, marginStart: 10 }}
          />
          <Text style={styles.section_text}>Address</Text>
          <ArrowRight
            width={24}
            height={24}
            style={{ color: COLOR.text_secondary_color, marginLeft: 'auto', marginEnd: 5 }}
          />
        </Pressable>
        <Pressable style={styles.section_container} onPress={onMyStorePress}>
          <Store width={26} height={26} style={{ color: COLOR.text_blue_color, marginStart: 10 }} />
          <Text style={styles.section_text}>My Stores</Text>
          <ArrowRight
            width={24}
            height={24}
            style={{ color: COLOR.text_secondary_color, marginLeft: 'auto', marginEnd: 5 }}
          />
        </Pressable>
      </View>
      <View style={{ flex: 2 }}>
        <Pressable style={styles.section_container}>
          <Text
            style={[styles.section_text, { fontSize: 23, color: COLOR.button_secondary_color }]}
          >
            App Settings
          </Text>
        </Pressable>
        <Pressable style={styles.section_container} onPress={onPolicyPress}>
          <Note
            width={26}
            height={26}
            style={{ color: COLOR.button_secondary_color, marginStart: 10 }}
          />
          <Text style={styles.section_text}>User Policy</Text>
          <ArrowRight
            width={24}
            height={24}
            style={{ color: COLOR.text_secondary_color, marginLeft: 'auto', marginEnd: 5 }}
          />
        </Pressable>
        <Pressable style={styles.section_container} onPress={onSettingPress}>
          <Setting
            width={26}
            height={26}
            style={{ color: COLOR.button_secondary_color, marginStart: 10 }}
          />
          <Text style={styles.section_text}>Settings</Text>
          <ArrowRight
            width={24}
            height={24}
            style={{ color: COLOR.text_secondary_color, marginLeft: 'auto', marginEnd: 5 }}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <SubmitButton
          hoverColor={COLOR.button_press_orange_color}
          buttonColor={COLOR.button_orange_color}
          title="Log-out"
          style={{ flex: 1, marginVertical: 20 }}
          onPressFunction={() => setConfirmLogoutVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 21,
    backgroundColor: COLOR.background_color,
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    marginVertical: 5,
  },

  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 100,
  },

  user_name_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: COLOR.text_primary_color,
    marginStart: 15,
  },

  section_container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.indicator_color,
  },

  section_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 19,
    color: COLOR.text_primary_color,
    marginStart: 10,
  },
});

export default ProfileScreen;
