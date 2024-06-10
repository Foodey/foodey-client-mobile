import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackButton from '../BackButton';
import { COLOR } from '../../constants/Colors';
import FullArrowLeft from '~/resources/icons/full-arrow-left.svg';

function IntroHeader({ style, title, onLeftButtonPress }) {
  return (
    <View style={[style, styles.container]}>
      <TouchableOpacity style={styles.button_left} onPress={onLeftButtonPress}>
        <Text style={{ color: COLOR.text_blue_color, fontFamily: 'Manrope-Medium', fontSize: 16 }}>
          Back
        </Text>
      </TouchableOpacity>
      <Text style={styles.title_text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLOR.background_color,
  },

  button_left: {
    position: 'absolute',
    marginStart: 11,
    start: 0,
    // backgroundColor: "#ff0",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_right: {
    position: 'absolute',
    marginEnd: 11,
    end: 0,
  },

  button_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_blue_color,
  },

  title_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 28,
    color: COLOR.text_primary_color,
  },
});

export default IntroHeader;
