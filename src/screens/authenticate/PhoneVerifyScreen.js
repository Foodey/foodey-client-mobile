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
import { useState, useContext, useEffect } from 'react';
import Edit from '~/resources/icons/edit.svg';
import { EditPhoneNumModal, SuccessNotifyModal } from '~/components/messageBoxes';
import { AuthContext } from '~/contexts/AuthContext';
import { sendingOTPCodeAPI, verifyOTPCodeAPI } from '../../apiServices/AuthService';
import HTTPStatus from '../../constants/HTTPStatusCodes';

export default function PhoneVerifyScreen({ navigation, route }) {
  const { isForgotPassVerify } = route.params;

  const {
    signUpInputs,
    signUpErrorMessages,
    handleSignUpInputsChanged,
    handleSignUpErrors,

    forgotPassInputs,
    forgotPassErrorMessages,
    handleForgotPassInputsChanged,
    handleForgotPassErrors,

    OTPCode,
    setOTPCode,
    otpErrorMessage,
    setOTPErrorMessage,
  } = useContext(AuthContext);

  //NAVIGATORS:
  const onBackPressHandler = () => {
    setOTPErrorMessage('');
    handleForgotPassInputsChanged('', 'phoneNumber');
    handleForgotPassInputsChanged;
    Keyboard.dismiss();
    isForgotPassVerify ? navigation.popToTop() : navigation.goBack();
  };

  //USE STATES:
  const [codeSentFailedVisible, setCodeSentFailedVisible] = useState(false);
  const [verifiedNotifyVisible, setVerifiedNotifyVisible] = useState(false);

  const [isAllowGetNewCode, setIsAllowGetNewCode] = useState(true);

  useEffect(() => {
    sendOTPCode();
  }, []);

  useEffect(() => {
    if (!isAllowGetNewCode) {
      setTimeout(() => {
        setIsAllowGetNewCode(true);
        console.log(isAllowGetNewCode);
      }, 10000);
    }
  }, [isAllowGetNewCode]);

  //Functions:

  const sendOTPCode = async () => {
    try {
      console.log(signUpInputs.phoneNumber);
      const response = await sendingOTPCodeAPI(signUpInputs.phoneNumber);
      if (response.status === HTTPStatus.NO_CONTENT) console.log('Code sent successfully');
      else {
        console.log('Code sending failed');
        setCodeSentFailedVisible(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function closeVerifiedNotifyMsgBox() {
    setVerifiedNotifyVisible(false);
    navigation.replace('SignInUp_Screen');
  }

  // //  Edit phone number modal:
  // function onPhoneNumberTextChange(value) {
  //   isForgotPassVerify
  //     ? handleForgotPassErrors('', 'phoneNumber')
  //     : handleSignUpErrors('', 'phoneNumber');
  //   setNewPhoneNumber(value);
  // }

  // function onEditPhoneNumOKPress() {
  //   let valid = true;
  //   if (newPhoneNumber === '') {
  //     isForgotPassVerify
  //       ? handleForgotPassErrors('* Please input phone number', 'phoneNumber')
  //       : handleSignUpErrors('* Please input phone number', 'phoneNumber');
  //     valid = false;
  //   }
  //   // else if (!signUpInputs.phoneNumber.match('^(+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])d{7,9}$'))
  //   // {
  //   //   isForgotPassVerify
  //   //    ? handleForgotPassErrors('* Invalid phone number format', 'phoneNumber');
  //   //   valid = format', 'phoneNumber')
  //   //    : handleSignUpErrors('* Invalid phone number format', 'phoneNumber';
  //   // }
  //   if (valid) {
  //     isForgotPassVerify
  //       ? handleForgotPassInputsChanged(newPhoneNumber, 'phoneNumber')
  //       : handleSignUpInputsChanged(newPhoneNumber, 'phoneNumber');
  //     setNewPhoneNumber('');
  //     setEditPhoneNumberVisible(false);
  //     setOTPErrorMessage('');
  //     onResendCodeHandler();
  //   }
  // }

  //Testing OTP code: (PASSED)
  const VerifyCode = async () => {
    console.log('OTP that user type in: ' + OTPCode);
    try {
      const response = await verifyOTPCodeAPI(signUpInputs.phoneNumber, OTPCode);
      if (response.status >= 200 && response.status < 300) {
        setOTPCode('');
        setVerifiedNotifyVisible(true);
      } else if (response.status === HTTPStatus.NOT_ACCEPTABLE) {
        setOTPErrorMessage('* OTP Code does not match');
      } else {
        console.log('Unexpected error while verify code');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      {/* <EditPhoneNumModal
        visible={editPhoneNumberVisible}
        newPhoneNumber={newPhoneNumber}
        errorMessage={
          isForgotPassVerify ? forgotPassErrorMessages.phoneNumber : signUpErrorMessages.phoneNumber
        }
        onClose={() => {
          setEditPhoneNumberVisible(false);
        }}
        onPhoneNumberTextChange={onPhoneNumberTextChange}
        onEditPhoneNumCancelPress={() => {
          setEditPhoneNumberVisible(false);
        }}
        onEditPhoneNumOKPress={onEditPhoneNumOKPress}
      /> */}
      <SuccessNotifyModal
        title="You’re successfully verified!"
        visible={verifiedNotifyVisible}
        onOKPressHandler={closeVerifiedNotifyMsgBox}
      />
      <SuccessNotifyModal
        title="OTP code sent failed, please try again later!!"
        visible={codeSentFailedVisible}
        onOKPressHandler={() => setCodeSentFailedVisible(false)}
      />
      <View style={styles.header_container}>
        <BackButton onPressFunction={onBackPressHandler} />
      </View>
      <UtilityCard
        style={styles.title_content_container}
        title={isForgotPassVerify ? 'Reset Password' : 'Verify Phone Number'}
        content="We have sent you a 6-digit code. Please enter here to verify your number."
      />
      <View style={styles.edit_phoneNum_container}>
        <View style={styles.phoneNum_display_container}>
          <Text style={styles.phoneNum_display_text}>
            +84 {isForgotPassVerify ? forgotPassInputs.phoneNumber : signUpInputs.phoneNumber}
          </Text>
        </View>
      </View>
      <OTPInputBox
        onResendCodePress={sendOTPCode}
        errorMessage={otpErrorMessage}
        style={styles.code_input_container}
        disabled={!isAllowGetNewCode}
      />
      <View style={styles.footer_container}>
        <SubmitButton
          showIcon={true}
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 320 }}
          title="Next"
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
