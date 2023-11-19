import { StyleSheet, Text, View, Image } from 'react-native';
import { background_color } from '../constants/colors';

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
    backgroundColor: background_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
