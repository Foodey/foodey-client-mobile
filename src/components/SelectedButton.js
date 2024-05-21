import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Tick } from '~/resources/icons';

function SelectedButton({ style, isSelected, onPressFunction }) {
  return (
    <Pressable onPress={onPressFunction} style={[styles.container, style]}>
      <Tick width={26} height={26} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 60,
    // height: 60,
    // borderRadius: 100,
    // backgroundColor: COLOR.input_background_color,
  },
});

export default SelectedButton;
