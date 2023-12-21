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
import { PhoneNumberBox } from '~/components/authenticate';
import { SubmitButton, BackButton, UtilityCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState, useContext } from 'react';
import Edit from '~/resources/icons/edit.svg';
import { EditPhoneNumModal, SuccessNotifyModal } from '~/components/messageBoxes';
import { AuthContext } from '~/contexts/AuthContext';

export default function ForgotPassScreen({ navigation }) {
  const {
    forgotPassInputs,
    forgotPassErrorMessages,
    handleForgotPassInputsChanged,
    handleForgotPassErrors,
  } = useContext(AuthContext);

  //NAVIGATORS:
  const onBackPressHandler = () => {
    Keyboard.dismiss();
    handleForgotPassInputsChanged('', 'phoneNumber');
    handleForgotPassErrors('', 'phoneNumber');
    navigation.goBack();
  };

  //Functions:
  const onNextPressHandler = () => {
    let valid = true;
    const phoneRegex = '^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$';

    if (forgotPassInputs.phoneNumber === '') {
      handleForgotPassErrors('* Please input phone number', 'phoneNumber');
      valid = false;
    } else if (!forgotPassInputs.phoneNumber.match(phoneRegex)) {
      handleForgotPassErrors('* Invalid phone number format', 'phoneNumber');
      valid = false;
    }
    if (valid) {
      navigation.navigate('PhoneVerify_Screen', { isForgotPassVerify: true });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton onPressFunction={onBackPressHandler} />
      </View>
      <UtilityCard
        style={styles.title_content_container}
        title="Reset Password"
        content="Please let us know the forgotten-password account. Enter the phone number below."
      />
      <View style={styles.edit_phoneNum_container}>
        <PhoneNumberBox
          style={{ flex: 1, marginBottom: 6 }}
          value={forgotPassInputs.phoneNumber}
          errorMessage={forgotPassErrorMessages.phoneNumber}
          onChangeText={(text) => {
            handleForgotPassErrors('', 'phoneNumber');
            handleForgotPassInputsChanged(text, 'phoneNumber');
          }}
          onDeletePress={() => {
            handleForgotPassInputsChanged('', 'phoneNumber');
          }}
        />
        <View style={{ flex: 1.25, marginBottom: 6 }} />
      </View>
      <View style={styles.footer_container}>
        <SubmitButton
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 320 }}
          showIcon={true}
          title="Next"
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={onNextPressHandler}
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
    flex: 3.5,
    marginHorizontal: 21,
  },

  footer_container: {
    flex: 5,
  },
});
