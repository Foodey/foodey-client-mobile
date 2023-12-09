import {
  View,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Pressable,
  Keyboard,
} from 'react-native';
import React from 'react';
import { OTPInputBox } from '~/components/authenticate';
import { SubmitButton, BackButton, UtilityCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState, useContext } from 'react';
import Edit from '~/resources/icons/edit.svg';
import { EditPhoneNumModal, SuccessNotifyModal } from '~/components/messageBoxes';
import { AuthContext } from '~/contexts/AuthContext';

export default function PhoneVerifyScreen({ navigation }) {
  const {
    signUpInputs,
    handleSignUpInputsChanged,
    handleSignUpErrors,
    OTPCode,
    setOTPCode,
    otpErrorMessage,
    setOTPErrorMessage,
  } = useContext(AuthContext);

  //NAVIGATORS:
  const onBackPressHandler = () => {
    setOTPErrorMessage('');
    Keyboard.dismiss();
    navigation.goBack();
  };

  //USE STATES:
  const [editPhoneNumberVisible, setEditPhoneNumberVisible] = useState(false);
  const [verifiedNotifyVisible, setVerifiedNotifyVisible] = useState(false);
  const [resendCodeNotifyVisible, setResendCodeNotifyVisible] = useState(false);

  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  //Functions:

  function onResendCodeHandler() {
    //Resend the OTP code:
    // if(codeSentSuccess)
    // {
    console.log('New OTP code sent!!');
    setResendCodeNotifyVisible(true);
    // }
    // else
    // {
    //   throw new Error();
    // }
  }

  function closeResendCodeNotifyMsgBox() {
    setResendCodeNotifyVisible(false);
  }

  function closeVerifiedNotifyMsgBox() {
    setVerifiedNotifyVisible(false);
    //Navigate to HomeScreen
  }

  //  Edit phone number modal:
  function onPhoneNumberTextChange(value) {
    handleSignUpErrors('', 'phoneNumber');
    setNewPhoneNumber(value);
  }

  function onEditPhoneNumOKPress() {
    let valid = true;
    if (newPhoneNumber === '') {
      handleSignUpErrors('* Please input phone number', 'phoneNumber');
      valid = false;
    }
    // else if (!signUpInputs.phoneNumber.match('^(+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])d{7,9}$'))
    // {
    //   handleSignUpErrors('* Invalid phone number format', 'phoneNumber');
    //   valid = false;
    // }
    if (valid) {
      handleSignUpInputsChanged(newPhoneNumber, 'phoneNumber');
      setNewPhoneNumber('');
      setEditPhoneNumberVisible(false);
      onResendCodeHandler();
    }
  }

  //Testing OTP code: (PASSED)
  let OTPCodeTest = 123456;
  function VerifyCode() {
    if (parseInt(OTPCode) === parseInt(OTPCodeTest)) {
      console.log('Correct');
      setOTPCode('');
      setVerifiedNotifyVisible(true);
    } else {
      console.log('Incorrect');
      setOTPErrorMessage('*OTP Code not match');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <EditPhoneNumModal
        visible={editPhoneNumberVisible}
        newPhoneNumber={newPhoneNumber}
        onClose={() => {
          setEditPhoneNumberVisible(false);
        }}
        onPhoneNumberTextChange={onPhoneNumberTextChange}
        onEditPhoneNumCancelPress={() => {
          setEditPhoneNumberVisible(false);
        }}
        onEditPhoneNumOKPress={onEditPhoneNumOKPress}
      />
      <SuccessNotifyModal
        title="You’re successfully verified!"
        visible={verifiedNotifyVisible}
        onOKPressHandler={closeVerifiedNotifyMsgBox}
      />
      <SuccessNotifyModal
        title="We have sent you a new OTP code, please re-check!!"
        visible={resendCodeNotifyVisible}
        onOKPressHandler={closeResendCodeNotifyMsgBox}
      />
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
          <Text style={styles.phoneNum_display_text}>+84 {signUpInputs.phoneNumber}</Text>
        </View>
        <Pressable
          onPress={() => {
            setEditPhoneNumberVisible(true);
          }}
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
        onResendCodePress={onResendCodeHandler}
        errorMessage={otpErrorMessage}
        style={styles.code_input_container}
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
