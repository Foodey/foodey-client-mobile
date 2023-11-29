import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { useState } from 'react';
import HidePassword from '~/resources/icons/hide-password.svg';
import ShowPassword from '~/resources/icons/show-password.svg';

function PasswordBox(props) {
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, { ...props.style }]}>
      <Text style={styles.title_text}>{props.title}</Text>
      <View
        style={[
          styles.input_container,
          {
            borderColor: props.errorMessage
              ? COLOR.text_errorMessage_color
              : isFocused
              ? COLOR.text_primary_color
              : COLOR.background_color,
          },
        ]}
      >
        <TextInput
          secureTextEntry={hidePassword}
          placeholder={props.placeholder}
          style={styles.phone_number_input}
          placeholderTextColor={COLOR.text_press_color}
          onChangeText={props.onChangeText}
          onFocus={() => {
            props.onFocus, setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        {/* Remain bug when handle hide-unhide password */}
        {isFocused && (
          <Pressable
            style={styles.button_delete_input}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <ShowPassword width={24} height={24} />
          </Pressable>
        )}
      </View>
      <Text style={styles.errorMessage_text}>{props.errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title_text: {
    fontWeight: '400',
    fontSize: 17,
    color: COLOR.text_primary_color,
    marginBottom: 5,
    marginStart: 13,
    fontFamily: 'Manrope',
  },

  input_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: COLOR.background_color,
    borderRadius: 14,
    backgroundColor: COLOR.input_background_color,
  },

  phone_number_input: {
    flex: 6.25,
    height: 52,
    fontSize: 17,
    color: COLOR.text_primary_color,
    paddingLeft: 12,
    fontFamily: 'Manrope',
  },

  button_delete_input: {
    flex: 0.75,
  },

  errorMessage_text: {
    marginStart: 13,
    marginTop: 1,
    color: COLOR.text_errorMessage_color,
  },
});

export default PasswordBox;
