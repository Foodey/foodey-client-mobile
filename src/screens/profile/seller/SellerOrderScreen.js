import { View, Text, Pressable, StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, SellerOrderCard } from '../../../components/seller';
import { sellerOrders } from '../../../constants/TempData';
import { formatVND, getTime } from '../../../utils/ValueConverter';

const SellerOrderScreen = ({ navigation }) => {
  const pendingOrders = sellerOrders?.filter((order) => order?.status === 'PENDING');
  const confirmedOrders = sellerOrders?.filter((order) => order?.status === 'STORE_CONFIRMED');

  const [page, setPage] = useState('0');

  const onDetailPress = (item) => {
    if (item.status === 'DELIVERED') {
      navigation.navigate('SellerRatingDetail_Screen', { itemInfos: item?.items });
    } else {
      navigation.navigate('SellerOrderDetail_Screen', { itemInfos: item?.items });
    }
  };

  const onPendingPress = () => {
    if (page !== '0') setPage('0');
  };

  const onConfirmedPress = () => {
    if (page !== '1') setPage('1');
  };

  const onAllPress = () => {
    if (page !== '2') setPage('2');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Order List" onLeftButtonPress={() => navigation.goBack()} />
      <View style={styles.switcher_container}>
        <Pressable
          onPress={onPendingPress}
          style={[
            styles.switcher_option_container,
            {
              borderBottomColor:
                page === '0' ? COLOR.button_press_primary_color : COLOR.background_color,
            },
          ]}
        >
          <Text
            style={[
              styles.switcher_option_text,
              {
                color: page === '0' ? COLOR.button_press_primary_color : COLOR.text_primary_color,
              },
            ]}
          >
            Pending
          </Text>
        </Pressable>
        <Pressable
          onPress={onConfirmedPress}
          style={[
            styles.switcher_option_container,
            {
              borderBottomColor:
                page === '1' ? COLOR.button_press_primary_color : COLOR.background_color,
            },
          ]}
        >
          <Text
            style={[
              styles.switcher_option_text,
              {
                color: page === '1' ? COLOR.button_press_primary_color : COLOR.text_primary_color,
              },
            ]}
          >
            Confirmed
          </Text>
        </Pressable>
        <Pressable
          onPress={onAllPress}
          style={[
            styles.switcher_option_container,
            {
              borderBottomColor:
                page === '2' ? COLOR.button_press_primary_color : COLOR.background_color,
            },
          ]}
        >
          <Text
            style={[
              styles.switcher_option_text,
              {
                color: page === '2' ? COLOR.button_press_primary_color : COLOR.text_primary_color,
              },
            ]}
          >
            All
          </Text>
        </Pressable>
      </View>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10, paddingBottom: 10 }}
        data={page === '0' ? pendingOrders : page === '1' ? confirmedOrders : sellerOrders}
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

export default SellerOrderScreen;
