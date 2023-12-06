import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
          onEndEditing={props.onEndEditing}
          onFocus={() => {
            props.onFocus = () => {};
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableWithoutFeedback
          style={styles.button_delete_input}
          onPressIn={() => setHidePassword(!hidePassword)}
        >
          <View style={styles.button_delete_input}>
            {hidePassword ? (
              <ShowPassword width={24} height={24} onPress={() => setHidePassword(!hidePassword)} />
            ) : (
              <HidePassword width={24} height={24} onPress={() => setHidePassword(!hidePassword)} />
            )}
          </View>
        </TouchableWithoutFeedback>
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
    alignItems: 'center',
    flex: 1,
  },

  errorMessage_text: {
    marginStart: 13,
    marginTop: 1,
    color: COLOR.text_errorMessage_color,
  },
});

export default PasswordBox;
