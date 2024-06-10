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
    <View>
      <Text>SellerOrderCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default SellerOrderCard;
