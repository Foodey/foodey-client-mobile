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
import { COLOR } from '../../constants/Colors';
import { FillLocation, Buy, Discount, Note } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';
// import { orderedProducts } from '~/constants/TempData';
import { SubmitButton, BackButton, AddressCard } from '../../components';
import { HomeContext } from '~/contexts/HomeContext';
import { SuccessNotifyModal, NoteModal } from '../../components/messageBoxes';
import { formatVND } from '../../utils/ValueConverter';
import { placeOrderAPI, deleteAllCartProductAPI } from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import { AppContext } from '../../contexts/AppContext';

const ConfirmOrderScreen = ({ navigation, route }) => {
  //Navigation:

  const onBackPress = () => {
    navigation.goBack();
  };

  const { getPendingOrder } = useContext(AppContext);
  const { cartInfo, setCartInfo } = useContext(HomeContext);
  // const { restaurantName, isViewOnly } = route.params;
  const { restaurantID, restaurantName } = route.params;
  //Use states
  const [shippingFee, setShippingFee] = useState(25000);
  const [discountFee, setDiscountFee] = useState(0);
  const [noteValue, setNoteValue] = useState('');

  const [successPlaceOrder, setSuccessPlaceOrder] = useState(false);
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  //Functions:
  const onNotePress = () => {
    setIsNoteVisible(true);
    //
  };

  const onBackdropPres = () => {
    setIsNoteVisible(false);
    //
  };

  const onModalClosePress = () => {
    setIsNoteVisible(false);
    //
  };

  const onOKPressHandler = async (restaurantID) => {
    setSuccessPlaceOrder(false);
    try {
      const response = await deleteAllCartProductAPI(restaurantID);
      if (response.status === HTTPStatus.NO_CONTENT) {
        setCartInfo({});
        getPendingOrder();
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
      <NoteModal
        noteValue={noteValue}
        isVisible={isNoteVisible}
        backdropPress={onBackdropPres}
        onClosePress={onModalClosePress}
      />
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
        <AddressCard
          title="Delivery Address"
          name="Nguyen Phu Thinh"
          phoneNumber="0865474654"
          address="69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương"
          disabled={false}
        />
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
          <Discount width={25} height={25} color={COLOR.text_pink_color} />
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
        <Pressable
          style={[styles.voucher_container, { borderColor: COLOR.text_primary_color }]}
          onPress={onNotePress}
        >
          <Note width={25} height={25} color={COLOR.text_tertiary_color} />
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
              {cartInfo.totalRealPrice === undefined ? '0.000' : formatVND(cartInfo.totalRealPrice)}{' '}
              VND
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
              {cartInfo.totalRealPrice === undefined
                ? '0.000'
                : formatVND(cartInfo.totalRealPrice + shippingFee - discountFee)}{' '}
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
    flex: 1,
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
