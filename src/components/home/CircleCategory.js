import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { COLOR } from '~/constants/Colors';

function CircleCategory({ style, title, imageLink, imageStyle, onPressFunction }) {
  return (
    <Pressable style={[styles.circle, style]} onPress={onPressFunction}>
      <View style={{ flex: 2.25, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={imageStyle} onPress={onPressFunction} source={imageLink} />
      </View>
      <View style={{ flex: 1.25 }}>
        <Text style={styles.title_text}>{title}</Text>
      </View>
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
    fontFamily: 'Manrope-Medium',
    fontWeight: '500',
    fontSize: 16.5,
    color: COLOR.text_primary_color,
  },
});

export default CircleCategory;
