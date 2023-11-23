import { Pressable, Text } from 'react-native';
import Style from '~/screens/onBoarding/OnBoardingStyle';
import { COLOR } from '../constants/Colors';
import { ArrowRight } from '../constants/Icons';
import { SvgXml } from 'react-native-svg';

function SubmitButton(props) {
  return (
    <Pressable
      onPress={props.onPressFunction}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? COLOR.button_hover_primary_color : COLOR.button_primary_color,
        },
        { ...props.style },
      ]}
    >
      <Text style={Style.next_pressable_text}>{props.title}</Text>
    </Pressable>
  );
}

export default SubmitButton;
