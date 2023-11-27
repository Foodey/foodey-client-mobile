import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox } from '~/components/authenticate';
import { useState } from 'react';

function Login(props) {
  const [pressableSkipIsHovering, SetPressableSkipIsHovering] = useState(false);

  const SkipPressInHandler = () => {
    SetPressableSkipIsHovering(true);
  };

  const SkipPressOutHandler = () => {
    SetPressableSkipIsHovering(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <InputBox
        title="Email"
        errorMessage="The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <PasswordBox
        title="Password"
        errorMessage="The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <Pressable
        style={[styles.button]}
        onPressIn={SkipPressInHandler}
        onPressOut={SkipPressOutHandler}
        onPress={props.onPressFunction}
      >
        <Text
          style={[
            styles.forgotPass_text,
            {
              color: pressableSkipIsHovering ? COLOR.text_tertiary_color : COLOR.text_press_color,
            },
          ]}
        >
          Forgot Password?
        </Text>
      </Pressable>
    </View>
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
