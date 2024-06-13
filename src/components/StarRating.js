import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Star, RateStar } from '../resources/icons';
import { COLOR } from '../constants/Colors';

const StarRating = ({
  style,
  starSize = 55,
  maxStar,
  value = 0,
  isEditable = true,
  onRatingChange,
}) => {
  const [rateValue, setRateValue] = useState(value);

  const onStarPress = (star) => {
    setRateValue(star);
    if (onRatingChange) {
      onRatingChange(star);
    }
  };

  return (
    <View style={[style, { flexDirection: 'row' }]}>
      {[...Array(maxStar)].map((_, index) => {
        const star = index + 1;
        return (
          <Pressable key={star} onPress={isEditable ? () => onStarPress(star) : () => {}}>
            <Star
              width={starSize}
              height={starSize}
              color={star <= rateValue ? COLOR.star_background_color : COLOR.text_press_color}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
