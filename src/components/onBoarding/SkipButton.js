import { Pressable, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../constants/Colors';
import { useState } from 'react';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function SkipButton(props) {
  const [pressableSkipIsHovering, SetPressableSkipIsHovering] = useState(false);

  const SkipPressInHandler = () => {
    SetPressableSkipIsHovering(true);
  };

  const SkipPressOutHandler = () => {
    SetPressableSkipIsHovering(false);
  };

  return (
    <Pressable
      onPressIn={SkipPressInHandler}
      onPressOut={SkipPressOutHandler}
      onPress={props.onPressFunction}
      style={[styles.button, { ...props.style }]}
    >
      <Text
        style={[
          styles.button_text,
          { color: pressableSkipIsHovering ? COLOR.text_tertiary_color : COLOR.text_press_color },
        ]}
      >
        Skip
      </Text>
      <ArrowRight
        width={24}
        height={24}
        style={[
          styles.button_text,
          { color: pressableSkipIsHovering ? COLOR.text_tertiary_color : COLOR.text_press_color },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button_text: {
    color: COLOR.text_tertiary_color,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Bold',
  },
});

export default SkipButton;
