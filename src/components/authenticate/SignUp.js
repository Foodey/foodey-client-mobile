import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox, PhoneNumberBox } from '~/components/authenticate';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';

function SignUp(props) {
  const {
    signUpInputs,
    handleSignUpInputsChanged,
    clearSignUpInputs,
    signUpErrorMessages,
    handleSignUpErrors,
    clearSignUpErrors,
  } = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <InputBox
        value={signUpInputs.fullName}
        title="Full Name"
        placeholder="Enter your full name"
        errorMessage={signUpErrorMessages.fullName}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleSignUpErrors('', 'fullName');
          handleSignUpInputsChanged(text, 'fullName');
        }}
        onDeletePress={() => {
          handleSignUpInputsChanged('', 'fullName');
        }}
      />
      <PhoneNumberBox
        value={signUpInputs.phoneNumber}
        errorMessage={signUpErrorMessages.phoneNumber}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleSignUpErrors('', 'phoneNumber');
          handleSignUpInputsChanged(text, 'phoneNumber');
        }}
        onDeletePress={() => {
          handleSignUpInputsChanged('', 'phoneNumber');
        }}
      />
      <PasswordBox
        value={signUpInputs.password}
        title="Password"
        placeholder="Enter your password"
        errorMessage={signUpErrorMessages.password}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleSignUpErrors('', 'password');
          handleSignUpInputsChanged(text, 'password');
        }}
      />
      <PasswordBox
        value={signUpInputs.confirmPassword}
        title="Re-enter Password"
        placeholder="Re-enter your password"
        errorMessage={signUpErrorMessages.confirmPassword}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleSignUpErrors('', 'confirmPassword');
          handleSignUpInputsChanged(text, 'confirmPassword');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
