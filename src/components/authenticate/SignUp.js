import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox, PhoneNumberBox } from '~/components/authenticate';
import { useState } from 'react';

function SignUp(props) {
  const { fullName, phoneNumber, password, confirmPassword } = props.errorMessages;

  const [inputs, setInputs] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputsChanged = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  //Notify the parent component when the user done editing the Inputs
  const handleEndEditing = () => {
    props.handleSignUpInputsChanged(inputs);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <InputBox
        value={inputs.fullName}
        title="Full Name"
        placeholder="Enter your full name"
        errorMessage={fullName}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleInputsChanged(text, 'fullName');
        }}
        onEndEditing={handleEndEditing}
        onDeletePress={() => {
          handleInputsChanged('', 'fullName');
        }}
      />
      <PhoneNumberBox
        value={inputs.phoneNumber}
        errorMessage={phoneNumber}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleInputsChanged(text, 'phoneNumber');
        }}
        onEndEditing={handleEndEditing}
        onDeletePress={() => {
          handleInputsChanged('', 'phoneNumber');
        }}
      />
      <PasswordBox
        title="Password"
        placeholder="Enter your password"
        errorMessage={password}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleInputsChanged(text, 'password');
        }}
        onEndEditing={handleEndEditing}
      />
      <PasswordBox
        title="Re-enter Password"
        placeholder="Re-enter your password"
        errorMessage={confirmPassword}
        style={{ marginBottom: 6 }}
        onChangeText={(text) => {
          handleInputsChanged(text, 'confirmPassword');
        }}
        onEndEditing={handleEndEditing}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
