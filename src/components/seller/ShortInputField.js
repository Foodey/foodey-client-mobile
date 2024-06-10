import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';

function ShortInputField({
  style,
  title,
  placeholder,
  value,
  keyboardType,
  isRequired,
  onChangeText,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        {title} {isRequired && <Text style={{ color: COLOR.text_errorMessage_color }}>*</Text>}
      </Text>
      <TextInput
        keyboardType={keyboardType}
        multiline
        placeholder={placeholder}
        placeholderTextColor={COLOR.text_press_color}
        value={value}
        style={[styles.text, { textAlign: 'right' }]}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.background_color,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_press_color,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  text: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 16.5,
    color: COLOR.text_primary_color,
  },
});

export default ShortInputField;
