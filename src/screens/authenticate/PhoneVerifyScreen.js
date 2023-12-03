import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { OTPInputBox, Login, SignUp, ThirdPartyAuth } from '~/components/authenticate';
import { SubmitButton, BackButton, UtilityCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';

export default function PhoneVerifyScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
      <OTPInputBox style={styles.code_input_container} />
      <View style={styles.footer_container}>
        <SubmitButton
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 320 }}
          title="Verify and Continue"
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
        />
      </View>
    </KeyboardAvoidingView>
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
    flex: 0.25,
  },

  code_input_container: {
    flex: 3,
    marginHorizontal: 21,
  },

  footer_container: {
    flex: 5,
  },
});
