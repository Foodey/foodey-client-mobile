import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { restaurants } from '~/constants/TempData';
import { COLOR } from '~/constants/Colors';
import { Star, EstimateTime, Category } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function RestaurantInfo({ style, avgRating, estimateTime, category, viewDetailPress }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.info_container}>
        <View style={styles.info_row_container}>
          <Star width={21} height={21} style={styles.icons} />
          <Text style={styles.info_text}>Ratings: {avgRating}</Text>
        </View>
        <View style={styles.info_row_container}>
          <EstimateTime width={21} height={21} style={styles.icons} />
          <Text style={styles.info_text}>Delivers in {estimateTime} mins</Text>
        </View>
        <View style={styles.info_row_container}>
          <Category width={21} height={21} style={styles.icons} />
          <Text style={styles.info_text}>{category}</Text>
        </View>
      </View>
      <View style={styles.viewDetail_button_container}>
        <Pressable onPress={viewDetailPress} style={styles.button}>
          <ArrowRight width={24} height={24} style={{ color: COLOR.text_primary_color }} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.resInfo_background_color,
    paddingHorizontal: 10,
    borderRadius: 15,
  },

  icons: {
    color: COLOR.text_primary_color,
    marginEnd: 9,
  },

  info_container: {
    flex: 2.5,
    paddingHorizontal: 15,
  },

  viewDetail_button_container: {
    flex: 1,
    alignItems: 'center',
  },

  info_row_container: {
    flexDirection: 'row',
    marginVertical: 7,
  },

  info_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_primary_color,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR.background_color,
  },
});

export default RestaurantInfo;
