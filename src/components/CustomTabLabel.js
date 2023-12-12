import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../constants/Colors';

function CustomTabLabel({ focused, label }) {
  return (
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <Text
        style={[
          styles.label_text,
          {
            fontFamily: focused ? 'Manrope-Bold' : 'Manrope',
          },
        ]}
      >
        {label}
      </Text>
      {focused && <View style={styles.circle}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: COLOR.text_primary_color,
    margin: 2.5,
  },

  label_text: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOR.text_primary_color,
  },
});

export default CustomTabLabel;
