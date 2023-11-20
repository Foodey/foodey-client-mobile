import { Pressable, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Style from '../../styles/OnBoardingStyle';
import { COLOR } from '../../constants/Colors';
import { ArrowRight } from '../../constants/Icons';
import { useState } from 'react';

const SkipButton = (props) => {
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
      style={({ pressed }) => [{ ...props.style }]}
    >
      <Text
        style={[
          Style.skip_pressable_text,
          { color: pressableSkipIsHovering ? COLOR.text_tertiary_color : COLOR.text_hover_color },
        ]}
      >
        Skip
      </Text>
    </Pressable>
  );
};

export default SkipButton;
