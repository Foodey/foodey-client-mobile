import { View, Text, Pressable, StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, SellerOrderCard } from '../../../components/seller';
import { sellerOrders } from '../../../constants/TempData';
import { formatVND, getTime } from '../../../utils/ValueConverter';

const SellerRatingScreen = ({ navigation }) => {
  const deliveredOrders = sellerOrders?.filter((order) => order?.status === 'DELIVERED');

  const onDetailPress = (item) => {
    if (item.status === 'DELIVERED') {
      navigation.navigate('SellerRatingDetail_Screen', { itemInfos: item?.items });
    } else {
      navigation.navigate('SellerOrderDetail_Screen', { itemInfos: item?.items });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Rating List" onLeftButtonPress={() => navigation.goBack()} />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10, paddingBottom: 10 }}
        data={deliveredOrders}
        renderItem={({ item }) => (
          <SellerOrderCard
            onDetailPress={() => onDetailPress(item)}
            totalPrice={formatVND(item?.payment?.price)}
            itemList={item?.items}
            numOfItems={item?.items?.length}
            createdTime={getTime(item?.createdAt)}
            status={item?.status}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  switcher_container: {
    flexDirection: 'row',
    backgroundColor: COLOR.background_color,
  },

  switcher_option_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  switcher_option_text: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 17.5,
  },
});

export default SellerRatingScreen;
