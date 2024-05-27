import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../constants/Colors';
import { FillLocation } from '../resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function AddressCard({ style, title, name, phoneNumber, address, onPressFunction }) {
  return (
    <Pressable style={[styles.deliveryAddress_container, style]} onPress={onPressFunction}>
      <View style={{ flex: 1 }}>
        <FillLocation width={25} height={25} />
      </View>
      <View style={styles.deliveryAddress_info_container}>
        <Text
          style={{
            fontFamily: 'Manrope-Bold',
            fontSize: 17,
            color: COLOR.text_primary_color,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={styles.customer_info_text} ellipsizeMode="tail" numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.customer_info_text, { color: COLOR.text_press_color }]}>
            {'  '}|{'  '}
          </Text>
          <Text style={styles.customer_info_text}>{phoneNumber}</Text>
        </View>
        <Text style={styles.customer_info_text} ellipsizeMode="tail" numberOfLines={2}>
          {address}{' '}
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ArrowRight width={25} height={25} style={{ color: COLOR.text_press_color }} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deliveryAddress_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.button_primary_color,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },

  deliveryAddress_info_container: {
    flex: 9,
  },

  customer_info_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    color: COLOR.text_primary_color,
  },
});

export default AddressCard;
