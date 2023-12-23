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
import { ProductQuantityAdjuster, FavoriteButton, DishBar } from '~/components/discover';
import { FillLocation, Buy, Discount, Note } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';
import { orderedProducts } from '~/constants/TempData';
import { SubmitButton } from '~/components';

const ConfirmOrderScreen = ({ navigation }) => {
  //Navigation:

  //Use states

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton style={[styles.header, { marginBottom: 10 }]} />
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
              Starbucks Coffee - Vinhomes Grand Park
            </Text>
          </View>
          {orderedProducts.map(({ image, name, addOnInfo, quantity, totalUnitPrice }, index) => (
            <View key={index} style={styles.ordered_product_row}>
              <View style={{ flex: 1.5 }}>
                <Image source={image} style={{ width: 50, height: 50 }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.product_name_text, { fontSize: 17 }]}>{quantity}x</Text>
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.product_name_text}>{name}</Text>
                <Text style={styles.product_addOn_text}>{addOnInfo}</Text>
              </View>
              <View style={{ flex: 3.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.product_totalPrice_text}>{totalUnitPrice} VND</Text>
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
          <Text style={[styles.voucher_text, { marginStart: 5 }]}>Voucher</Text>
          <Text
            style={[styles.voucher_text, { marginLeft: 'auto', color: COLOR.text_secondary_color }]}
          >
            None
          </Text>
          <ArrowRight width={25} height={25} style={{ color: COLOR.text_press_color }} />
        </Pressable>
        <View style={styles.price_container}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Sub-total (3 items)</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>267.000 VND</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Shipping fee (4.7 km)</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>25.000 VND</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.price_text]}>Promotion code</Text>
            <Text style={[styles.price_text, { marginLeft: 'auto' }]}>-20.000 VND</Text>
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
              272.000 VND
            </Text>
          </View>
        </View>
        <SubmitButton
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
