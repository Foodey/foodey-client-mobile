import { View, SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { AuthSwitcher, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { SubmitButton, BackButton, UtilityCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';

export default function PhoneVerifyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton />
      </View>
      <UtilityCard
        style={styles.title_content_container}
        title="Verify Phone Number"
        content="We have sent you a 6-digit code. Please enter here to verify your number."
      />
      <View style={styles.edit_phoneNum_container} />
      <View style={styles.code_input_container} />
      <View style={styles.footer_container}>
        <SubmitButton
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 260 }}
          title="Verify and Continue"
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_container: {
    flex: 0.5,
    marginLeft: 21,
    marginTop: 5,
  },

  title_content_container: {
    flex: 2,
    marginHorizontal: 21,
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
