import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BackButton from '../BackButton';
import { COLOR } from '../../constants/Colors';

export default function ProfileScreenHeader({ title, style, onBackPressFunction }) {
  return (
    <View style={[styles.header_container, style]}>
      <BackButton style={styles.back_button} onPressFunction={onBackPressFunction} />
      <Text style={styles.header_text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header_container: {
    height: '18%',
    marginHorizontal: 21,
    // backgroundColor: "#ff0"
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    flex: 2.5,
    marginTop: 20,
  },

  back_button: {
    flex: 1,
    alignItems: 'center',
  },
});
