import { View, Text, Image, Switch, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { ArrowRight } from '../../resources/icons';
import { formatVND } from '../../utils/ValueConverter';

function SellerProductBar({ style, name, price, image, isDisable, onProductPress }) {
  const onDeletePress = () => {
    //
  };

  return (
    <Pressable style={[styles.container, style]} onPress={onProductPress}>
      <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={styles.image}
          source={{ uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
        />
      </View>
      <View style={{ flex: 5, marginStart: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <ArrowRight
            width={16}
            height={16}
            color={COLOR.text_secondary_color}
            style={{ marginTop: 6, marginStart: 3 }}
          />
        </View>
        <Text style={styles.price_text}>{formatVND(price)} vnd</Text>
      </View>
      <View style={{ flex: 1.1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable onPress={onDeletePress}>
          <Text
            style={{
              fontFamily: 'Manrope-Medium',
              fontSize: 15,
              color: COLOR.orderStatus_Canceled_text,
            }}
          >
            DELETE
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
    flexDirection: 'row',
    marginVertical: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },

  name_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18.5,
    color: COLOR.text_primary_color,
  },

  price_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_secondary_color,
  },
});

export default SellerProductBar;
