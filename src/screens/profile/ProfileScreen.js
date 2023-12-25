import { View, Text, Pressable, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import React, { useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { Discount, Wallet, FillLocation, Note, Setting } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';
import { LocationDisplay } from '../../components/home';

const ProfileScreen = () => {
  const { logout, userInfo } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
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
      <View style={{ flex: 2.5 }}>
        <Pressable style={styles.section_container}>
          <Text style={[styles.section_text, { fontSize: 23, color: COLOR.text_blue_color }]}>
            Personal Information
          </Text>
        </Pressable>
        <Pressable style={styles.section_container}>
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
        <Pressable style={styles.section_container}>
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
        </Pressable>
        <Pressable style={styles.section_container}>
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
      </View>
      <View style={{ flex: 2 }}>
        <Pressable style={styles.section_container}>
          <Text
            style={[styles.section_text, { fontSize: 23, color: COLOR.button_secondary_color }]}
          >
            App Settings
          </Text>
        </Pressable>
        <Pressable style={styles.section_container}>
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
        <Pressable style={styles.section_container}>
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
          onPressFunction={logout}
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
