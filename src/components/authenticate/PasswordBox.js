import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

function PasswordBox(props) {
  return (
    <View style={[styles.container, { ...props.style }]}>
      <Text style={styles.title_text}>{props.title}</Text>
      <TextInput
        placeholder="Enter your username"
        style={styles.text_input}
        placeholderTextColor={COLOR.text_press_color}
        onChangeText={props.onChangeText}
        secureTextEntry
      />
      <Text style={styles.text_errorMessage}>*{props.errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title_text: {
    fontWeight: '400',
    fontSize: 17,
    color: COLOR.text_primary_color,
    marginBottom: 10,
    marginStart: 13,
    fontFamily: 'Manrope',
  },

  text_input: {
    height: 48,
    borderWidth: 1.2,
    borderColor: COLOR.text_primary_color,
    borderRadius: 14,
    fontSize: 17,
    color: COLOR.text_primary_color,
    paddingLeft: 12,
    fontFamily: 'Manrope',
  },

  text_errorMessage: {
    marginStart: 13,
    marginTop: 3,
    color: COLOR.text_errorMessage_color,
  },
});

export default PasswordBox;
