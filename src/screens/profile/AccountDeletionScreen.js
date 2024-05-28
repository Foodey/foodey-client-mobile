import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { ProfileScreenHeader } from '../../components/profile';
import { SubmitButton } from '../../components';

const AccountDeletionScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const onDeleteAccountPress = () => {
    //validate something and delete account
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader title="Account Deletion" onBackPressFunction={onBackPress} />
      <Text style={styles.title_text}>You're going leave?</Text>
      <View style={styles.content_container}>
        <Text style={[styles.content_text, { fontFamily: 'Manrope-Bold', marginBottom: 30 }]}>
          We are sorry to see you go. By deleting account, you will permanently lose:
        </Text>
        <Text style={styles.content_text}>
          <Text style={{ fontFamily: 'Manrope-Bold' }}>{'\u2022'}</Text> Access to log in Foodey by
          current account.
        </Text>
        <Text style={styles.content_text}>
          <Text style={{ fontFamily: 'Manrope-Bold' }}>{'\u2022'}</Text> All existing benefits such
          as Foodey vouchers, saved shops and address, etc.
        </Text>
        <Text style={styles.content_text}>
          <Text style={{ fontFamily: 'Manrope-Bold' }}>{'\u2022'}</Text> All order records and
          previous notifications.
        </Text>

        <Text style={[styles.content_text, { marginTop: 30 }]}>
          Please ensure all your orders and payments are completed.
        </Text>
        <Text style={styles.content_text}>Otherwise, you can't proceed.</Text>
      </View>
      <SubmitButton
        style={{ height: '7%', marginHorizontal: 21, marginTop: 30 }}
        title={'Accept'}
        buttonColor={COLOR.button_red_color}
        hoverColor={COLOR.button_red_color}
        onPressFunction={onDeleteAccountPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  content_container: {
    paddingHorizontal: 21,
    marginTop: 20,
  },

  title_text: {
    alignSelf: 'center',
    fontSize: 22,
    color: COLOR.button_red_color,
    fontFamily: 'Manrope-Bold',
  },

  content_text: {
    fontSize: 18,
    color: COLOR.text_primary_color,
    fontFamily: 'Manrope-Regular',
  },
});

export default AccountDeletionScreen;
