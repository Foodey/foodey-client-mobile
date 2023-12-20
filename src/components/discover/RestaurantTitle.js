import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { restaurants } from '~/constants/TempData';
import { COLOR } from '~/constants/Colors';
import { Location } from '~/resources/icons';

function RestaurantTitle({ style }) {
  return (
    <View style={[styles.container, style]}>
      <Image source={restaurants[0].logoLink} style={{ width: 64, height: 64, marginEnd: 18 }} />
      <View>
        <Text style={styles.title_text}>{restaurants[0].name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Location
            width={19}
            height={19}
            style={{ color: COLOR.text_primary_color, marginEnd: 5 }}
          />
          <Text style={styles.address_text}>{restaurants[0].address.split(',')[0]}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
  },

  address_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 17,
    color: COLOR.text_primary_color,
  },
});

export default RestaurantTitle;
