import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { ArrowRight } from '../../resources/icons';

function PressableInputField({ style, title, isRequired, value, errorMessage, onPressFunction }) {
  return (
    <View style={style}>
      <Pressable style={[styles.container]} onPress={onPressFunction}>
        <View style={{ width: '40%', flexDirection: 'row' }}>
          <Text style={styles.text}>{title} </Text>
          {isRequired && (
            <Text style={[styles.text, { color: COLOR.text_errorMessage_color }]}>*</Text>
          )}
        </View>
        <View style={{ width: '60%', flexDirection: 'row' }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.text,
              {
                color: !value ? COLOR.text_press_color : COLOR.text_primary_color,
                marginStart: 'auto',
              },
            ]}
          >
            {!value ? `Set ${title}` : value}
          </Text>
          {!value && <ArrowRight style={{ color: COLOR.text_secondary_color, marginTop: 2 }} />}
        </View>
      </Pressable>
      {errorMessage && (
        <View style={styles.errorMessage_container}>
          <Text style={styles.errorMessage_text}>* {errorMessage}</Text>
        </View>
      )}
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
    paddingVertical: 20,
  },

  text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16.5,
    color: COLOR.text_primary_color,
  },

  errorMessage_container: {
    backgroundColor: COLOR.errorMessage_background_Color,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
  },

  errorMessage_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLOR.text_errorMessage_color,
  },
});

export default PressableInputField;
