import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { OrderCard } from '~/components/order';
import { AppContext } from '~/contexts/AppContext';
import { ConfirmActionModal } from '../../components/messageBoxes';
import { cancelOrderAPI } from '../../apiServices/HomeService';
import { getOrderEvaluationAPI } from '../../apiServices/UserService';
import HTTPStatus from '../../constants/HTTPStatusCodes';

const OrderScreen = ({ navigation }) => {
  const {
    pendingOrderList,
    getPendingOrder,
    storeConfirmedOrderList,
    getStoreConfirmedOrder,
    deliveringOrderList,
    getDeliveringOrder,
    deliveredOrderList,
    getDeliveredOrder,
    canceledOrderList,
    getCanceledOrder,

    favoriteRestaurants,
  } = useContext(AppContext);

  const onOrderCardPress = (item) => {
    navigation.navigate('ViewOnlyConfirmOrder_Screen', { orderInfos: item });
  };

  const onViewResPress = (item) => {
    const isUserFavorite = favoriteRestaurants.some((restaurant) => restaurant.id === item.id);
    navigation.navigate('Home', {
      screen: 'RestaurantMenu_Screen',
      params: {
        brandID: item.brandId,
        restaurantID: item.id,
        restaurantName: item.name,
        restaurantLogo: item.logo,
        restaurantWallpaper: item.wallpaper,
        restaurantAddress: item.address,
        isUserFavorite: isUserFavorite,
      },
    });
  };

  const onRateOrderPress = async (item) => {
    try {
      const response = await getOrderEvaluationAPI(item?.id);
      if (response.status === HTTPStatus.OK) {
        const isRated = response?.data?.rated;
        const orderRating = Math.round(response?.data?.rating);
        const orderComment = response?.data?.comment;

        if (orderRating !== null || orderRating !== undefined) {
          navigation.navigate('Rating_Screen', {
            isRated: isRated,
            orderRating: orderRating,
            orderComment: orderComment,
            orderID: item?.id,
          });
        }
      } else {
        console.log('Error when fetching order evaluation');
      }
    } catch (err) {
      console.log('Error when fetching order evaluation ' + err);
    }
  };

  const [isOnGoingSelected, setIsOnGoingSelected] = useState(true);
  const [ongoingOrderList, setOngoingOrderList] = useState({});
  const [completedOrderList, setCompletedOrderList] = useState({});

  const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);

  const [cancelOrderID, setCancelOrderID] = useState('');

  useEffect(() => {
    const sortList = sortOngoingOrderList(
      pendingOrderList,
      storeConfirmedOrderList,
      deliveringOrderList,
    );
    // console.log(sortList.length);
    setOngoingOrderList(sortList);
  }, [pendingOrderList, storeConfirmedOrderList, deliveredOrderList]);

  useEffect(() => {
    const sortList = sortCompletedOrderList(deliveredOrderList, canceledOrderList);
    // console.log(sortList.length);
    setCompletedOrderList(sortList);
  }, [deliveredOrderList, canceledOrderList]);

  useEffect(() => {
    const fetch = async () => {
      await getDeliveringOrder();
      await getStoreConfirmedOrder();
      await getPendingOrder();
    };

    fetch();
  }, []);

  const onOnGoingSelected = async () => {
    if (!isOnGoingSelected) {
      setIsOnGoingSelected(true);
      await getDeliveringOrder();
      await getStoreConfirmedOrder();
      await getPendingOrder();
    }
  };

  const onCompletedSelected = async () => {
    if (isOnGoingSelected) {
      setIsOnGoingSelected(false);
      await getDeliveredOrder();
      await getCanceledOrder();
    }
  };

  const onCancelOrderPress = (item) => {
    setCancelOrderID(item?.id);
    setIsCancelConfirmVisible(true);
  };

  const onOKPress = async () => {
    try {
      const response = await cancelOrderAPI(cancelOrderID);
      if (response?.status === HTTPStatus.OK) {
        await getCanceledOrder();
        await getPendingOrder();
        setCancelOrderID('');
        setIsCancelConfirmVisible(false);
      } else {
        console.log('Error when trying to cancel order');
      }
    } catch (err) {
      console.log('Error when trying to cancel order: ' + err);
    }
  };

  //Concat and sort the these 3 orderList into 1 single list to display (PENDING => STORE_CONFIRMED => DELIVERING)
  const sortOngoingOrderList = (
    tempPendingOrderList,
    tempStoreConfirmedOrderList,
    tempDeliveringOrderList,
  ) => {
    if (tempPendingOrderList && tempStoreConfirmedOrderList && tempDeliveringOrderList) {
      const concatOrderList = [
        ...tempPendingOrderList,
        ...tempStoreConfirmedOrderList,
        ...tempDeliveringOrderList,
      ];

      // console.log('P length' + tempPendingOrderList.length);
      // console.log('SC length' + tempStoreConfirmedOrderList.length);
      // console.log('D length' + tempDeliveringOrderList.length);

      const sortedOrderList = concatOrderList.sort((a, b) => {
        const statusOrder = ['PENDING', 'STORE_CONFIRMED', 'DELIVERING'];

        return statusOrder.indexOf(a.status) + 1 - (statusOrder.indexOf(b.status) + 1);
      });

      // console.log(sortedOrderList);
      return sortedOrderList;
    }
    return null;
  };

  //Concat and sort the these 2 orderList into 1 single list to display (DELIVERED => CANCELED)
  const sortCompletedOrderList = (tempDeliveredOrderList, tempCanceledConfirmedOrderList) => {
    if (tempDeliveredOrderList && tempCanceledConfirmedOrderList) {
      const concatOrderList = [...tempDeliveredOrderList, ...tempCanceledConfirmedOrderList];

      // console.log('P length' + tempPendingOrderList.length);
      // console.log('SC length' + tempStoreConfirmedOrderList.length);
      // console.log('D length' + tempDeliveringOrderList.length);

      const sortedOrderList = concatOrderList.sort((a, b) => {
        const statusOrder = ['DELIVERED', 'CANCELED'];

        return statusOrder.indexOf(a.status) + 1 - (statusOrder.indexOf(b.status) + 1);
      });

      // console.log(sortedOrderList);
      return sortedOrderList;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={isCancelConfirmVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color}
      />
      <ConfirmActionModal
        title="Cancel Order"
        content="Are you sure you want to cancel this order?"
        visible={isCancelConfirmVisible}
        onCancelPress={() => setIsCancelConfirmVisible(false)}
        onOKPress={() => onOKPress()}
      />
      <View style={{ paddingHorizontal: 21 }}>
        <Text style={styles.header_text}>Orders</Text>
        <View style={styles.switcher_container}>
          <Pressable
            onPress={() => onOnGoingSelected()}
            style={[
              styles.switcher_option_container,
              {
                borderBottomColor: isOnGoingSelected
                  ? COLOR.indicator_current_color
                  : COLOR.background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.switcher_option_text,
                {
                  color: isOnGoingSelected
                    ? COLOR.indicator_current_color
                    : COLOR.text_primary_color,
                },
              ]}
            >
              Ongoing
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onCompletedSelected()}
            style={[
              styles.switcher_option_container,
              {
                borderBottomColor: !isOnGoingSelected
                  ? COLOR.indicator_current_color
                  : COLOR.background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.switcher_option_text,
                {
                  color: !isOnGoingSelected
                    ? COLOR.indicator_current_color
                    : COLOR.text_secondary_color,
                },
              ]}
            >
              Delivered
            </Text>
          </Pressable>
        </View>
      </View>
      {isOnGoingSelected ? (
        <View style={{ marginHorizontal: 21 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
            data={ongoingOrderList}
            renderItem={({ item }) => (
              <OrderCard
                // onPressFunction={onOrderCartPress}
                id={item?.id}
                status={item?.status}
                createdAt={item?.createdAt}
                // date={item.date}
                resName={item?.shop?.name}
                items={item?.items}
                totalPrice={item?.payment?.price}
                onCancelOrderPress={() => onCancelOrderPress(item)}
              />
            )}
          />
        </View>
      ) : (
        <View style={{ marginHorizontal: 21 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
            data={completedOrderList}
            renderItem={({ item }) => (
              <OrderCard
                id={item?.id}
                createdAt={item?.createdAt}
                status={item?.status}
                // date={item.date}
                resName={item?.shop?.name}
                items={item?.items}
                totalPrice={item?.payment?.price}
                onPressFunction={() => onOrderCardPress(item)}
                onViewResPress={() => {
                  onViewResPress(item?.shop);
                }}
                onRateOrderPress={() => onRateOrderPress(item)}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    marginVertical: 5,
  },

  switcher_container: {
    flexDirection: 'row',
  },

  switcher_option_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
  },

  switcher_option_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 17.5,
  },
});

export default OrderScreen;
