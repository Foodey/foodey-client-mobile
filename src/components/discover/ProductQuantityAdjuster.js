import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { COLOR } from '~/constants/Colors';
import { Add, Subtract } from '~/resources/icons';

function ProductQuantityAdjuster({
  style,
  quantity,
  buttonRadius,
  onSubtractPress,
  onAddingPress,
}) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.action_button,
          {
            backgroundColor: COLOR.button_secondary_color,
            width: buttonRadius,
            height: buttonRadius,
          },
        ]}
        onPress={onSubtractPress}
      >
        <Subtract
          width={buttonRadius}
          heigh={buttonRadius}
          style={{ color: COLOR.background_color }}
        />
      </Pressable>
      <View style={{ alignItems: 'center', width: 32, heigh: 32 }}>
        <Text style={[styles.quantity_text]}>{quantity}</Text>
      </View>
      <Pressable
        style={[
          styles.action_button,
          {
            backgroundColor: COLOR.button_primary_color,
            width: buttonRadius,
            height: buttonRadius,
          },
        ]}
        onPress={onAddingPress}
      >
        <Add width={buttonRadius} heigh={buttonRadius} style={{ color: COLOR.background_color }} />
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
