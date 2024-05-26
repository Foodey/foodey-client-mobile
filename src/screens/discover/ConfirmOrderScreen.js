import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { COLOR } from '~/constants/Colors';
import { BackButton } from '~/components';
import { FillLocation, Buy, Discount, Note } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';
// import { orderedProducts } from '~/constants/TempData';
import { SubmitButton } from '~/components';
import { HomeContext } from '~/contexts/HomeContext';
import { SuccessNotifyModal } from '../../components/messageBoxes';
import { formatVND } from '../../utils/ValueConverter';
import { placeOrderAPI, deleteAllCartProductAPI } from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';

const ConfirmOrderScreen = ({ navigation, route }) => {
  //Navigation:

  const onBackPress = () => {
    navigation.goBack();
  };

  const { cartInfo, setCartInfo } = useContext(HomeContext);
  // const { restaurantName, isViewOnly } = route.params;
  const { restaurantID, restaurantName } = route.params;
  //Use states
  const [shippingFee, setShippingFee] = useState(25000);
  const [discountFee, setDiscountFee] = useState(0);
  const [successPlaceOrder, setSuccessPlaceOrder] = useState(false);

  //Functions:

  const onOKPressHandler = async (restaurantID) => {
    setSuccessPlaceOrder(false);
    try {
      const response = await deleteAllCartProductAPI(restaurantID);
      if (response.status === HTTPStatus.NO_CONTENT) {
        setCartInfo({});
        navigation.popToTop(); // should navigate to the screen where user can track the order status
      } else {
        console.log('Unexpected error when clearing cart after order placing successfully');
      }
    } catch (err) {
      console.log('Unexpected error when clearing cart after order placing successfully ' + err);
    }
  };

  const onPlaceOrderPress = async (restaurantID, voucherCode, paymentMethod, address) => {
    try {
      const response = await placeOrderAPI(restaurantID, voucherCode, paymentMethod, address);
      if (response.status === HTTPStatus.CREATED) {
        setSuccessPlaceOrder(true);
      } else {
        console.log('Unexpected error when placing order');
      }
    } catch (err) {
      console.log('Unexpected error when placing order ' + err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <SuccessNotifyModal
        visible={successPlaceOrder}
        title="Your order is successfully placed!"
        onOKPressHandler={() => onOKPressHandler(restaurantID)}
      />
      <BackButton style={[styles.header, { marginBottom: 10 }]} onPressFunction={onBackPress} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header_text}>Confirm Order</Text>
        <Pressable style={styles.deliveryAddress_container}>
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
              Delivery Address
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={styles.customer_info_text} ellipsizeMode="tail" numberOfLines={1}>
                Le Doan Tan Tri
              </Text>
              <Text style={[styles.customer_info_text, { color: COLOR.text_press_color }]}>
                {'  '}|{'  '}
              </Text>
              <Text style={styles.customer_info_text}>0949336597</Text>
            </View>
            <Text style={styles.customer_info_text} ellipsizeMode="tail" numberOfLines={2}>
              123 ABC Street, Ward 2, District 7, Ho Chi Minh City, Vietnam{' '}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight width={25} height={25} style={{ color: COLOR.text_press_color }} />
          </View>
        </Pressable>
        <View style={styles.ordered_product_container}>
          <View style={{ flexDirection: 'row' }}>
            <Buy width={25} height={25} />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.restaurant_name_text}>
              {restaurantName}
            </Text>
          </View>
          {cartInfo?.items?.map(({ image, name, description, quantity, totalPrice }, index) => (
            <View key={index} style={styles.ordered_product_row}>
              <View style={{ flex: 2 }}>
                <Image
                  source={{ uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
                  style={{ width: 46, height: 46, borderRadius: 10 }}
                />
              </View>
              <View style={{ flex: 1.2 }}>
                <Text style={[styles.product_name_text, { fontSize: 17 }]}>{quantity}x</Text>
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.product_name_text}>{name}</Text>
                <Text style={styles.product_addOn_text}>{description}</Text>
              </View>
              <View style={{ flex: 4.25, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.product_totalPrice_text}>
                  {totalPrice === undefined ? '0.000' : formatVND(totalPrice)} VND
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable style={styles.voucher_container}>
          <Discount width={25} height={25} />
          <Text style={[styles.voucher_text, { marginStart: 5 }]}>Voucher</Text>
          <Text
            style={[
              styles.voucher_text,
              { marginLeft: 'auto', color: COLOR.button_secondary_color },
            ]}
          >
            Voucher added
          </Text>
          <ArrowRight width={25} height={25} style={{ color: COLOR.text_press_color }} />
        </Pressable>
        <Pressable style={[styles.voucher_container, { borderColor: COLOR.text_primary_color }]}>
          <Note width={25} height={25} />
          <Text style={[styles.voucher_text, { marginStart: 5 }]}>Note</Text>
          <Text
            style={[styles.voucher_text, { marginLeft: 'auto', color: COLOR.text_secondary_color }]}
          >
            None
          </Text>
          <ArrowRight width={25} height={25} style={{ color: COLOR.text_press_color }} />
        </Pressable>
        <View style={styles.price_container}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Sub-total ({cartInfo?.items?.length} items)</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>
              {cartInfo.totalPrice === undefined ? '0.000' : formatVND(cartInfo.totalPrice)} VND
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Shipping fee</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>
              {formatVND(shippingFee)} VND
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Promotion code</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>
              - {formatVND(discountFee)} VND
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Payment method</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>Cash</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.totalPrice_text]}>Total</Text>
            <Text
              style={[
                styles.totalPrice_text,
                { marginLeft: 'auto', color: COLOR.indicator_current_color },
              ]}
            >
              {cartInfo.totalPrice === undefined
                ? '0.000'
                : formatVND(cartInfo.totalPrice + shippingFee - discountFee)}{' '}
              VND
            </Text>
          </View>
        </View>
        {/* {!isViewOnly && (
          <SubmitButton
            onPressFunction={onPlaceOrderPress}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            style={{ height: 60, marginTop: 20 }}
            title="Place Order"
          />
        )} */}
        <SubmitButton
          onPressFunction={() =>
            onPlaceOrderPress(restaurantID, '', 'CASH', '69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương')
          } //voucherCode, paymentMethod and address hardcoded value should be replaced later
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          style={{ height: 60, marginTop: 20 }}
          title="Place Order"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    backgroundColor: COLOR.background_color,
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    marginVertical: 15,
  },

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

  restaurant_name_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_primary_color,
    marginStart: 10,
  },

  ordered_product_container: {
    borderWidth: 1,
    borderColor: COLOR.indicator_current_color,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },

  ordered_product_row: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  product_name_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    color: COLOR.text_primary_color,
  },

  product_addOn_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: COLOR.text_secondary_color,
  },

  product_totalPrice_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    color: COLOR.text_primary_color,
  },

  voucher_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.button_secondary_color,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },

  voucher_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_primary_color,
  },

  price_container: {
    marginVertical: 25,
  },

  price_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16.5,
    color: COLOR.text_secondary_color,
  },

  totalPrice_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: COLOR.text_primary_color,
  },
});

export default ConfirmOrderScreen;
