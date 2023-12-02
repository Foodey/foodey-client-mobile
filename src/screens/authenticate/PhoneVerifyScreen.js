import { View, SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { UtilityCard } from '~/components';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { SubmitButton, BackButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';

export default function PhoneVerifyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton />
      </View>
      <View style={styles.title_content_container} />
      <View style={styles.edit_phoneNum_container} />
      <View style={styles.code_input_container} />
      <View style={styles.footer_container} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_container: {
    flex: 1,
  },

  title_content_container: {
    flex: 2,
  },

  edit_phoneNum_container: {
    flex: 1,
  },

  code_input_container: {
    flex: 3,
  },

  footer_container: {
    flex: 4.25,
  },
});
