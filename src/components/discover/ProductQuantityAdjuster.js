import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { COLOR } from '~/constants/Colors';

function ProductQuantityAdjuster({ style, quantity, onSubtractPress, onAddingPress }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[styles.action_button, { backgroundColor: COLOR.button_secondary_color }]}
        onPress={onSubtractPress}
      >
        <Text style={[styles.icon, { fontSize: 27 }]}>-</Text>
      </Pressable>
      <View style={{ alignItems: 'center', width: 32, heigh: 32 }}>
        <Text style={[styles.quantity_text]}>{quantity}</Text>
      </View>
      <Pressable
        style={[styles.action_button, { backgroundColor: COLOR.button_primary_color }]}
        onPress={onAddingPress}
      >
        <Text style={styles.icon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  action_button: {
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantity_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 20,
    color: COLOR.text_primary_color,
  },

  icon: {
    color: COLOR.background_color,
    fontSize: 20,
  },
});

export default ProductQuantityAdjuster;
