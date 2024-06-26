// OTPInputBox.js
import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { AuthContext } from '~/contexts/AuthContext';

const OTPInputBox = (props) => {
  const { setOTPCode, setOTPErrorMessage } = useContext(AuthContext);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => inputRefs.current[0].focus(), 0);
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Combine the OTP values and pass it to the variable store in the AuthContext
    const combinedOtp = newOtp.join('');
    setOTPCode(combinedOtp);
  };

  const onPress = () => {
    setOTPErrorMessage('');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
    props.onResendCodePress();
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (key === 'Backspace' && index === 0) {
      inputRefs.current[index].focus();
    } else if (index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={[{ ...props.style }]}>
      <View style={styles.otp_input_and_error_container}>
        <View style={styles.otp_input_container}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              value={value}
              style={[
                styles.input_box,
                {
                  borderColor: props.errorMessage
                    ? COLOR.text_errorMessage_color
                    : COLOR.background_color,
                },
              ]}
              onChangeText={(text) => {
                handleOtpChange(index, text);
                setOTPErrorMessage('');
              }}
              keyboardType="numeric"
              maxLength={1}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
            />
          ))}
        </View>
        <Text style={styles.otp_input_error_text}>{props.errorMessage}</Text>
      </View>
      <View style={styles.resent_otp_container}>
        <Text style={styles.resend_otp_text}>Didn’t receive code?</Text>
        <Pressable style={styles.resend_otp_button} disabled={props.disabled} onPress={onPress}>
          <Text
            style={[
              styles.resend_otp_text,
              { textDecorationLine: 'underline' },
              {
                color: props.disabled
                  ? COLOR.disabled_resendCode_text
                  : COLOR.not_disabled_resendCode_text,
              },
            ]}
          >
            Get a new one
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otp_input_and_error_container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  otp_input_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  resent_otp_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input_box: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLOR.background_color,
    backgroundColor: COLOR.input_background_color,
    width: 49,
    height: 58,
    textAlign: 'center',
    fontSize: 21,
    margin: 5,
    fontFamily: 'Manrope',
    fontWeight: '500',
  },

  otp_input_error_text: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 13,
    color: COLOR.text_errorMessage_color,
    marginTop: 3,
  },

  resend_otp_text: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 17,
  },

  resend_otp_button: {
    marginStart: 3,
  },
});

export default OTPInputBox;
