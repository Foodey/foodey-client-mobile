import { View, Text, Pressable, StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import React, { useState, useContext, useLayoutEffect } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, SellerOrderCard } from '../../../components/seller';
import { sellerOrders } from '../../../constants/TempData';
import { formatVND, getTime } from '../../../utils/ValueConverter';
import { getOrderEvaluationAPI } from '../../../apiServices/UserService';
import HTTPStatus from '../../../constants/HTTPStatusCodes';
import { SellerContext } from '../../../contexts/SellerContext';

const SellerRatingScreen = ({ navigation, route }) => {
  const { shopID } = route.params;

  const { getDeliveredOrderOfShop, deliveredOrderList } = useContext(SellerContext);

  useLayoutEffect(() => {
    const fetchDelivered = async () => {
      await getDeliveredOrderOfShop(shopID);
    };

    fetchDelivered();
  }, []);

  const onViewRatingPress = async (item) => {
    try {
      const response = await getOrderEvaluationAPI(item?.id);
      if (response.status === HTTPStatus.OK) {
        const orderRating = Math.round(response?.data?.rating);
        const orderComment = response?.data?.comment;

        if (orderRating !== null || orderRating !== undefined) {
          navigation.navigate('SellerRatingDetail_Screen', {
            orderRating: orderRating,
            orderComment: orderComment,
          });
        }
      } else {
        console.log('Error when fetching order evaluation');
      }
    } catch (err) {
      console.log('Error when fetching order evaluation ' + err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Rating List" onLeftButtonPress={() => navigation.goBack()} />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10, paddingBottom: 10 }}
        data={deliveredOrderList}
        renderItem={({ item }) => (
          <SellerOrderCard
            customerName={item?.userName}
            totalPrice={formatVND(item?.payment?.price)}
            itemList={item?.items}
            numOfItems={item?.items?.length}
            createdTime={getTime(item?.createdAt)}
            status={item?.status}
            onViewRatingPress={() => onViewRatingPress(item)}
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
