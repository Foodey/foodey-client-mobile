import { Pressable, Text, StyleSheet } from 'react-native';
import { COLOR } from '../constants/Colors';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function SubmitButton(props) {
  return (
    <Pressable
      disabled={props.disabled}
      onPress={props.onPressFunction}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed || props.disabled ? props.hoverColor : props.buttonColor,
        },
        { ...props.style },
      ]}
    >
      <Text style={styles.button_text}>{props.title}</Text>
      {props.showIcon && (
        <ArrowRight width={24} height={24} style={{ color: COLOR.background_color }} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flexDirection: 'row',
  },

  button_text: {
    color: COLOR.background_color,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Regular',
    marginStart: 0,
  },
});

export default SubmitButton;
