import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Heart } from '~/resources/icons';

function FavoriteButton({ style, isFavorite, onPressFunction }) {
  return (
    <Pressable
      onPress={onPressFunction}
      style={[
        styles.container,
        style,
        {
          backgroundColor: isFavorite
            ? COLOR.isFavorite_background_color
            : COLOR.input_background_color,
        },
      ]}
    >
      <Heart
        width={24}
        height={24}
        style={{
          color: isFavorite ? COLOR.isFavorite_icon_color : COLOR.text_press_color,
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR.input_background_color,
  },
});

export default FavoriteButton;
