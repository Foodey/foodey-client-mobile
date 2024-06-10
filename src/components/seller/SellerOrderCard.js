import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { formatVND } from '../../utils/ValueConverter';
import { COLOR } from '../../constants/Colors';

function SellerOrderCard({
  customerName,
  numOfItems,
  totalPrice,
  itemList,
  createdTime,
  isConfirmed,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content_container}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <View style={{ backgroundColor: COLOR.text_blue_color, paddingHorizontal: 10 }}>
            <Text
              style={{ fontFamily: 'Manrope-Bold', fontSize: 20, color: COLOR.background_color }}
            >
              01
            </Text>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.content_text, { fontSize: 18, color: COLOR.text_primary_color }]}
          >
            Nguyen Phu Thinh
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.content_text}>
            <Text style={{ color: COLOR.text_primary_color }}>{numOfItems}</Text> item(s){'  '}|
            <Text style={{ color: COLOR.text_primary_color }}>
              {'  '}
              {totalPrice}vnd
            </Text>
          </Text>
          <View style={{ marginTop: 8 }}>
            {itemList?.map(({ quantity, name }, index) => (
              <View key={index} style={{}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.content_text}>
                  {quantity} x {name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.content_text, { fontSize: 18 }]}>{createdTime}</Text>
        </View>
      </View>
      <View style={styles.action_container}>
        <Pressable
          style={[
            styles.button,
            { marginStart: 'auto', borderWidth: 1, backgroundColor: COLOR.background_color },
          ]}
        >
          <Text style={[styles.button_text]}>Details</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { borderColor: COLOR.text_pink_color, backgroundColor: COLOR.background_color },
          ]}
        >
          <Text style={[styles.button_text, { color: COLOR.text_pink_color }]}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.order_background_color,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  content_container: {
    flexDirection: 'row',
  },

  action_container: {
    flexDirection: 'row',
    marginTop: 5,
  },

  content_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_secondary_color,
  },

  button: {
    borderWidth: 2,
    marginEnd: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  button_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
});

export default SellerOrderCard;
