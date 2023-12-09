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
import { PasswordBox } from '~/components/authenticate';
import { SubmitButton, BackButton, UtilityCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import { useState, useContext } from 'react';
import Edit from '~/resources/icons/edit.svg';
import { EditPhoneNumModal, SuccessNotifyModal } from '~/components/messageBoxes';
import { AuthContext } from '~/contexts/AuthContext';

export default function ResetPassScreen({ navigation }) {
  const {
    forgotPassInputs,
    forgotPassErrorMessages,
    handleForgotPassInputsChanged,
    handleForgotPassErrors,
  } = useContext(AuthContext);

  const [resetPassNotifyVisible, setResetPassNotifyVisible] = useState(false);

  //NAVIGATORS:
  const onBackPressHandler = () => {
    Keyboard.dismiss();
    handleForgotPassInputsChanged('', 'password');
    handleForgotPassInputsChanged('', 'confirmPassword');
    navigation.goBack();
  };

  //Functions:

  const closeResetPassNotifyMsgBox = () => {
    handleForgotPassInputsChanged('', 'password');
    handleForgotPassInputsChanged('', 'confirmPassword');
    setResetPassNotifyVisible(false);
  };

  const onNextPressHandler = () => {
    let valid = true;

    if (forgotPassInputs.password === '') {
      handleForgotPassErrors('* Please input password', 'password');
      valid = false;
    } else if (forgotPassInputs.password.length < 8 || forgotPassInputs.password.length > 30) {
      handleForgotPassErrors('* Password must be at least 8 characters', 'password');
      valid = false;
    }

    if (forgotPassInputs.confirmPassword === '') {
      handleForgotPassErrors('* Please input confirm password', 'confirmPassword');
      valid = false;
    } else if (forgotPassInputs.confirmPassword !== forgotPassInputs.password) {
      handleForgotPassErrors('* Confirm password does not match the password', 'confirmPassword');
      valid = false;
    }

    if (valid) {
      //Reset password code;
      //if(Reset Password successful)
      handleForgotPassErrors('', 'confirmPassword');
      console.log(forgotPassInputs);
      console.log('Navigate to HomeScreen');
      setResetPassNotifyVisible(true);
      // navigation.navigate('HomeScreen');
      // else
      //   handle Error;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <SuccessNotifyModal
        title="Password reset successfully!"
        visible={resetPassNotifyVisible}
        onOKPressHandler={closeResetPassNotifyMsgBox}
      />
      <View style={styles.header_container}>
        <BackButton onPressFunction={onBackPressHandler} />
      </View>
      <UtilityCard
        style={styles.title_content_container}
        title="Reset Password"
        content="Please enter a new password below so we can reset your account's password."
      />
      <View style={styles.edit_phoneNum_container}>
        <PasswordBox
          value={forgotPassInputs.password}
          title="Password"
          placeholder="Enter your password"
          errorMessage={forgotPassErrorMessages.password}
          style={{ marginBottom: 6, flex: 1 }}
          onChangeText={(text) => {
            handleForgotPassErrors('', 'password');
            handleForgotPassInputsChanged(text, 'password');
          }}
        />
        <PasswordBox
          value={forgotPassInputs.confirmPassword}
          title="Re-enter Password"
          placeholder="Re-enter your password"
          errorMessage={forgotPassErrorMessages.confirmPassword}
          style={{ marginBottom: 40, flex: 1 }}
          onChangeText={(text) => {
            handleForgotPassErrors('', 'confirmPassword');
            handleForgotPassInputsChanged(text, 'confirmPassword');
          }}
        />
      </View>
      <View style={styles.footer_container}>
        <SubmitButton
          style={{ flex: 1, marginHorizontal: 21, marginBottom: 320 }}
          title="Confirm"
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
