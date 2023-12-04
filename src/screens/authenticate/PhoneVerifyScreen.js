import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import React from 'react';
import { OTPInputBox } from '~/components/authenticate';
import { SubmitButton, BackButton, UtilityCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';
import Edit from '~/resources/icons/edit.svg';

export default function PhoneVerifyScreen({ navigation }) {
  //NAVIGATORS:
  onBackPressHandler = () => {
    navigation.goBack();
  };

  //USE STATES:
  const [OTPCode, setOTPCode] = useState(0);
  const [phoneNumber, SetPhoneNumber] = useState('865 474 654');
  const [errorMessage, setErrorMessage] = useState('');

  //Testing OTP code: (PASSED)
  const OTPCodeTest = 123456;
  function VerifyCode() {
    if (parseInt(OTPCode) === parseInt(OTPCodeTest)) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton onPressFunction={onBackPressHandler} />
      </View>
      <UtilityCard
        style={styles.title_content_container}
        title="Verify Phone Number"
        content="We have sent you a 6-digit code. Please enter here to verify your number."
      />
      <View style={styles.edit_phoneNum_container}>
        <View style={styles.phoneNum_display_container}>
          <Text style={styles.phoneNum_display_text}>+84 {phoneNumber}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.phoneNum_edit_button,
            {
              backgroundColor: pressed
                ? COLOR.edtButton_pressed_background_color
                : COLOR.edtButton_background_color,
            },
          ]}
        >
          <Edit width={17} height={17} />
        </Pressable>
      </View>
      <OTPInputBox
        errorMessage={errorMessage}
        style={styles.code_input_container}
        onOtpInputChange={(combinedOtp) => {
          setOTPCode(combinedOtp);
        }}
      />
      <View style={styles.footer_container}>
        <SubmitButton
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 320 }}
          title="Verify and Continue"
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={VerifyCode}
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
    flex: 0.5,
    flexDirection: 'row',
    marginHorizontal: 21,
  },

  code_input_container: {
    flex: 3,
    marginHorizontal: 21,
  },

  footer_container: {
    flex: 5,
  },

  phoneNum_display_container: {
    backgroundColor: COLOR.input_background_color,
    alignItems: 'center',
    justifyContent: 'center',
    width: 156,
    height: 39,
    padding: 8,
    borderColor: COLOR.input_border_color,
    borderRadius: 70,
  },

  phoneNum_display_text: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 17,
    color: COLOR.text_primary_color,
  },

  phoneNum_edit_button: {
    width: 39,
    height: 39,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.edit_button_background_color,
    marginStart: 10,
  },
});
