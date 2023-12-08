import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { PasswordBox, PhoneNumberBox } from '~/components/authenticate';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';

function Login(props) {
  const [forgotPasswordPress, setForgotPasswordPress] = useState(false);

  const ForgotPassPressInHandler = () => {
    setForgotPasswordPress(true);
  };

  const ForgotPassPressOutHandler = () => {
    setForgotPasswordPress(false);
  };

  const {
    loginInputs,
    handleLoginInputsChanged,
    clearLoginInputs,
    loginErrorMessages,
    handleLoginErrors,
    clearLoginErrors,
  } = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PhoneNumberBox
        value={loginInputs.phoneNumber}
        style={{ marginBottom: 6 }}
        errorMessage={loginErrorMessages.phoneNumber}
        onChangeText={(text) => {
          handleLoginErrors('', 'phoneNumber');
          handleLoginInputsChanged(text, 'phoneNumber');
        }}
        onDeletePress={() => {
          handleLoginInputsChanged('', 'phoneNumber');
        }}
      />
      <PasswordBox
        value={loginInputs.password}
        title="Password"
        placeholder="Enter your password"
        style={{ marginBottom: 6 }}
        errorMessage={loginErrorMessages.password}
        onChangeText={(text) => {
          handleLoginErrors('', 'password');
          handleLoginInputsChanged(text, 'password');
        }}
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
