import { Pressable, Text, StyleSheet } from 'react-native';
import { COLOR } from '../../constants/Colors';
import { useState } from 'react';

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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_text: {
    color: COLOR.text_tertiary_color,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Bold',
  },
});

export default SkipButton;
