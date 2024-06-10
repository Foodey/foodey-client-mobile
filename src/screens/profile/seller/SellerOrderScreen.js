import { View, Text, Pressable, StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, SellerOrderCard } from '../../../components/seller';
import { sellerOrders } from '../../../constants/TempData';
import { formatVND, getTime } from '../../../utils/ValueConverter';

const SellerOrderScreen = ({ navigation }) => {
  const [page, setPage] = useState('0');

  const onNewPress = () => {
    if (page !== '0') setPage('0');
  };

  const onConfirmedPress = () => {
    if (page !== '1') setPage('1');
  };

  const onHistoryPress = () => {
    if (page !== '2') setPage('2');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Order List" onLeftButtonPress={() => navigation.goBack()} />
      <View style={styles.switcher_container}>
        <Pressable
          onPress={onNewPress}
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
            New
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
          onPress={onHistoryPress}
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
            History
          </Text>
        </Pressable>
      </View>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
        data={sellerOrders}
        renderItem={({ item }) => (
          <SellerOrderCard
            totalPrice={formatVND(item?.payment?.price)}
            itemList={item?.items}
            numOfItems={item?.items?.length}
            createdTime={getTime(item?.createdAt)}
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
