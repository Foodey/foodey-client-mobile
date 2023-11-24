import { Pressable, Text, StyleSheet } from 'react-native';
import { COLOR } from '../constants/Colors';
import { ArrowRight } from '../constants/Icons';
import { SvgXml } from 'react-native-svg';

function SubmitButton(props) {
  return (
    <Pressable
      onPress={props.onPressFunction}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? props.hoverColor : props.buttonColor,
        },
        { ...props.style },
      ]}
    >
      <Text style={styles.button_text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderRadius: 25,
  },

  button_text: {
    color: COLOR.background_color,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Regular',
  },
});

export default SubmitButton;
