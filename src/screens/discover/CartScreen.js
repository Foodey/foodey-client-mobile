import React, { useState, useContext } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { SubmitButton } from '~/components';
import CloseCircle from '~/resources/icons/close-circle.svg';
import { orderedProducts } from '~/constants/TempData';
import { CartProductBar } from '~/components/discover';
import { formatVND } from '../../utils/ValueConverter';
import {
  addProductToCartAPI,
  deleteProductFromCartAPI,
  getCartInfoOfResAPI,
} from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import { HomeContext } from '../../contexts/HomeContext';

function CartScreen({
  style,
  isVisible,
  restaurantID,
  cartData,
  subtotalPrice,
  onBackdropPress,
  onClosePress,
  onDeletePress,
  onCheckoutPress,
}) {
  // console.log(cartData);
  const { setCartInfo } = useContext(HomeContext);

  const backdropPress = () => {
    onBackdropPress();
  };

  const closeCart = () => {
    onClosePress();
  };

  const onDecreaseProductByOnePress = async (restaurantID, productID) => {
    try {
      const response = await deleteProductFromCartAPI(restaurantID, productID, 1);
      if (response.status === HTTPStatus.NO_CONTENT) {
        // console.log('Success delete')
        try {
          const response = await getCartInfoOfResAPI(restaurantID);
          if (response.status === HTTPStatus.OK) {
            setCartInfo(response.data);
            // console.log('Success reload cart')
          } else {
            console.log(
              'Unexpected error when re-getting cart information after decrease product quantity',
            );
          }
        } catch (err) {
          console.log(
            'Unexpected error when re-getting cart information after decrease product quantity' +
              err,
          );
        }
      } else {
        console.log('Unexpected error when decrease the quantity of product by 1');
      }
    } catch (err) {
      console.log('Unexpected error when decrease the quantity of product by 1' + err);
    }
  };

  const onIncreaseProductByOnePress = async (restaurantID, productID) => {
    try {
      const response = await addProductToCartAPI(restaurantID, productID, 1);
      if (response.status === HTTPStatus.NO_CONTENT) {
        // console.log('Success adding');
        try {
          const response = await getCartInfoOfResAPI(restaurantID);
          if (response.status === HTTPStatus.OK) {
            setCartInfo(response.data);
            // console.log('Success reload cart');
          } else {
            console.log(
              'Unexpected error when re-getting cart information after decrease product quantity',
            );
          }
        } catch (err) {
          console.log(
            'Unexpected error when re-getting cart information after decrease product quantity' +
              err,
          );
        }
      } else {
        console.log('Unexpected error when decrease the quantity of product by 1');
      }
    } catch (err) {
      console.log('Unexpected error when decrease the quantity of product by 1' + err);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onBackdropPress={backdropPress}
      transparent={true}
    >
      <View style={styles.overlay_background} />
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={[styles.container, style]}>
          <CloseCircle width={43} height={43} style={styles.close_button} onPress={closeCart} />
          <View style={styles.header_container}>
            <Text style={styles.header_text}>Cart</Text>
            <Pressable style={{ marginLeft: 'auto' }} onPress={onDeletePress}>
              <Text style={styles.clear_all_text}>CLEAR ALL</Text>
            </Pressable>
          </View>
          <View style={styles.products_display_container}>
            <FlatList
              style={[styles.scrollView_container]}
              showsVerticalScrollIndicator={false}
              data={cartData}
              renderItem={({ item }) => (
                <CartProductBar
                  image={{
                    uri: item.image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
                  }}
                  name={item.name}
                  addOnInfo={item.description}
                  totalUnitPrice={
                    item.productPrice === undefined
                      ? '0.000'
                      : formatVND(item.productPrice * item.quantity)
                  }
                  quantity={item.quantity}
                  onSubtractPress={() => onDecreaseProductByOnePress(restaurantID, item.productId)}
                  onAddingPress={() => onIncreaseProductByOnePress(restaurantID, item.productId)}
                />
              )}
            />
          </View>
          <View style={styles.footer_container}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontFamily: 'Manrope-Medium',
                  fontSize: 17,
                  color: COLOR.text_secondary_color,
                }}
              >
                Sub-total
              </Text>
              <Text style={styles.subtotal_text}>
                {subtotalPrice === undefined ? '0.000' : formatVND(subtotalPrice)} VND
              </Text>
            </View>
            <SubmitButton
              onPressFunction={onCheckoutPress}
              style={styles.checkout_button}
              buttonColor={COLOR.button_primary_color}
              hoverColor={COLOR.button_press_primary_color}
              title="Checkout"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay_background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  container: {
    width: '100%',
    height: 630,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 36,
    backgroundColor: COLOR.background_color,
    marginTop: 'auto',
  },

  close_button: {
    marginTop: 16,
    marginEnd: 16,
    marginLeft: 'auto',
  },

  header_container: {
    flex: 0.5,
    marginHorizontal: 21,
    marginBottom: 5,
  },

  products_display_container: {
    flex: 3.5,
    marginHorizontal: 21,
  },

  footer_container: {
    flex: 0.75,
    flexDirection: 'row',
    marginHorizontal: 21,
    alignItems: 'center',
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 25,
    color: COLOR.text_primary_color,
  },

  clear_all_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: COLOR.text_errorMessage_color,
  },

  subtotal_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 30,
    color: COLOR.text_blue_color,
  },

  checkout_button: {
    flex: 1,
    height: '80%',
  },

  scrollView_container: {
    marginBottom: 20,
  },
});

export default CartScreen;
