import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BackButton from '../BackButton';
import { COLOR } from '../../constants/Colors';
import FullArrowLeft from '~/resources/icons/full-arrow-left.svg';

function IntroHeader({ style, title, onLeftButtonPress }) {
  return (
    <View style={[style, styles.container]}>
      <TouchableOpacity style={styles.button_left} onPress={onLeftButtonPress}>
        <FullArrowLeft width={24} height={24} />
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
    // backgroundColor: '#0f0',
  },

  button_left: {
    position: 'absolute',
    marginStart: 11,
    start: 0,
    // backgroundColor: "#ff0",
    flexDirection: 'row',
    width: 26,
    height: 26,
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
