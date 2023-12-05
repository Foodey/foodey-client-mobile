import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { PasswordBox, PhoneNumberBox } from '~/components/authenticate';
import { useState } from 'react';

function Login(props) {
  const [forgotPasswordPress, setForgotPasswordPress] = useState(false);

  const ForgotPassPressInHandler = () => {
    setForgotPasswordPress(true);
  };

  const ForgotPassPressOutHandler = () => {
    setForgotPasswordPress(false);
  };

  const [countryCode, setCountryCode] = useState('+1');
  const [inputs, setInputs] = useState({
    phoneNumber: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    phoneNumber: '',
    password: '',
  });

  const handleInputsChanged = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleErrorsChanged = (text, input) => {
    setErrorMessages((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PhoneNumberBox style={{ marginBottom: 6 }} />
      <PasswordBox title="Password" placeholder="Enter your password" style={{ marginBottom: 6 }} />
      <Pressable
        style={[styles.button]}
        onPressIn={ForgotPassPressInHandler}
        onPressOut={ForgotPassPressOutHandler}
        onPress={props.onPressFunction}
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
