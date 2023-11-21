import { StyleSheet, Text, View, Image } from 'react-native';
import { COLOR } from '../../constants/Colors';

export default function IntroScreen() {
  return (
    <View style={styles.body}>
      <Image source={require('../../resources/images/logo-foodey.jpg')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },

  body: {
    flex: 1,
    backgroundColor: COLOR.background_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
