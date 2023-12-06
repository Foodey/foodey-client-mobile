import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { PasswordBox, PhoneNumberBox } from '~/components/authenticate';
import { useState } from 'react';

function Login(props) {
  const { phoneNumber, password } = props.errorMessages;

  const [forgotPasswordPress, setForgotPasswordPress] = useState(false);

  const ForgotPassPressInHandler = () => {
    setForgotPasswordPress(true);
  };

  const ForgotPassPressOutHandler = () => {
    setForgotPasswordPress(false);
  };

  const [inputs, setInputs] = useState({
    phoneNumber: '',
    password: '',
  });

  const handleInputsChanged = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  //Notify the parent component when the user done editing the Inputs
  const handleEndEditing = () => {
    props.handleLoginInputsChanged(inputs);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PhoneNumberBox
        value={inputs.phoneNumber}
        style={{ marginBottom: 6 }}
        errorMessage={phoneNumber}
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
        style={{ marginBottom: 6 }}
        errorMessage={password}
        onChangeText={(text) => handleInputsChanged(text, 'password')}
        onEndEditing={handleEndEditing}
      />
      <Pressable
        style={[styles.button]}
        onPressIn={ForgotPassPressInHandler}
        onPressOut={ForgotPassPressOutHandler}
        onPress={props.onForgotPassPress}
      >
        <Text
          style={[
            styles.forgotPass_text,
            {
              color: forgotPasswordPress ? COLOR.text_tertiary_color : COLOR.text_press_color,
            },
          ]}
        >
          Forgot Password?
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-end',
    marginStart: 231,
  },

  forgotPass_text: {
    fontFamily: 'Manrope',
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'right',
  },
});

export default Login;
