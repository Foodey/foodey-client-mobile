import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { restaurants } from '~/constants/TempData';
import { COLOR } from '~/constants/Colors';
import { Location } from '~/resources/icons';

function RestaurantTitle({ style, logoLink, name, address }) {
  return (
    <View style={[styles.container, style]}>
      <Image source={logoLink} style={{ width: 60, height: 60, marginEnd: 18 }} />
      <View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title_text}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Location
            width={19}
            height={19}
            style={{ color: COLOR.text_primary_color, marginEnd: 5 }}
          />
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.address_text}>
            {address}
          </Text>
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
    fontSize: 33,
    color: COLOR.text_primary_color,
  },

  address_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: COLOR.text_primary_color,
  },
});

export default RestaurantTitle;
