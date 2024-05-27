import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { COLOR } from '../../constants/Colors';

function ProfileTextInput({ style, errorMessage, placeholder, value, onChangeText, editable }) {
  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.input_container,
          {
            borderColor: errorMessage ? COLOR.text_errorMessage_color : COLOR.text_primary_color,
          },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          selectedStart={0}
          value={value}
          style={styles.text_input}
          placeholderTextColor={COLOR.text_press_color}
          onChangeText={onChangeText}
          editable={editable}
        />
        <View style={{ flex: 0.75 }}></View>
      </View>
      <Text style={styles.errorMessage_text}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLOR.background_color,
  },

  text_input: {
    flex: 6.25,
    fontSize: 18,
    color: COLOR.text_primary_color,
    paddingLeft: 10,
    fontFamily: 'Manrope-Regular',
    // backgroundColor: "#0f0"
  },

  errorMessage_text: {
    marginStart: 10,
    marginTop: 1,
    color: COLOR.text_errorMessage_color,
  },
});

export default ProfileTextInput;
