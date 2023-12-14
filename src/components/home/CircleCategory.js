import { TransitionIOSSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { COLOR } from '~/constants/Colors';

function CircleCategory({ style, title, imageLink, onPressFunction }) {
  return (
    <Pressable style={[styles.circle, style]} onPress={onPressFunction}>
      <Image source={imageLink} />
      <Text style={styles.title_text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 112,
    height: 112,
    borderRadius: 100,
    backgroundColor: COLOR.circleCategory_background_color,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title_text: {
    fontFamily: 'Manrope-Regular',
    fontWeight: '500',
    fontSize: 16.5,
    color: COLOR.text_primary_color,
    marginTop: 9,
  },
});

export default CircleCategory;
