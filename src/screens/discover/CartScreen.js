import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { SubmitButton } from '~/components';
import CloseCircle from '~/resources/icons/close-circle.svg';
import { orderedProducts } from '~/constants/TempData';
import { CartProductBar } from '~/components/discover';

function CartScreen({ style, isVisible, onBackdropPress, onClosePress }) {
  const backdropPress = () => {
    onBackdropPress();
  };

  const closeCart = () => {
    onClosePress();
  };

  return (
    <Modal visible={isVisible} animationType="slide" onBackdropPress={backdropPress}>
      <View style={[styles.container, style]}>
        <CloseCircle width={43} height={43} style={styles.close_button} onPress={closeCart} />
        <View style={styles.header_container}>
          <Text style={styles.header_text}>Cart</Text>
          <Pressable style={{ marginLeft: 'auto' }}>
            <Text style={styles.clear_all_text}>CLEAR ALL</Text>
          </Pressable>
        </View>
        <View style={styles.products_display_container}>
          <FlatList
            style={[styles.scrollView_container]}
            showsVerticalScrollIndicator={false}
            data={orderedProducts}
            renderItem={({ item }) => (
              <CartProductBar
                image={item.image}
                name={item.name}
                addOnInfo={item.addOnInfo}
                totalUnitPrice={item.totalUnitPrice}
                quantity={item.quantity}
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
            <Text style={styles.subtotal_text}>100.000 VND</Text>
          </View>
          <SubmitButton
            style={styles.checkout_button}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            title="Checkout"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 630,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 36,
    // backgroundColor: COLOR.background_color,
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
