import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import FullArrowLeft from '~/resources/icons/full-arrow-left.svg';

function BackButton(props) {
  const [backButtonIsPressing, SetBackButtonIsPressing] = useState(false);

  const BackPressInHandler = () => {
    SetBackButtonIsPressing(true);
  };

  const BackPressOutHandler = () => {
    SetBackButtonIsPressing(false);
  };

  return (
    <Pressable
      style={styles.button}
      onPressIn={BackPressInHandler}
      onPressOut={BackPressOutHandler}
      onPress={props.onPressFunction}
    >
      <FullArrowLeft width={24} height={24} />
      <Text style={styles.button_text}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 42,
    height: 24,
  },

  button_text: {
    color: COLOR.text_primary_color,
    fontFamily: 'Manrope-Regular',
    fontWeight: '500',
    fontSize: 15,
    marginStart: 3,
  },
});

export default BackButton;
