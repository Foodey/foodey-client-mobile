import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import BackButton from '../BackButton';
import { COLOR } from '../../constants/Colors';
import FullArrowLeft from '~/resources/icons/full-arrow-left.svg';

function IntroHeader({ style, title, onLeftButtonPress }) {
  return (
    <View style={[style, styles.container]}>
      <Pressable style={styles.button_left} onPress={onLeftButtonPress}>
        <FullArrowLeft />
      </Pressable>
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
