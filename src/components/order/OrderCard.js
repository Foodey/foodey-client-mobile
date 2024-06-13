import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import ArrowRight from '~/resources/icons/arrow-right.svg';
import { formatVND, formatDateTime } from '../../utils/ValueConverter';
import { COLOR } from '../../constants/Colors';

function OrderCard({
  style,
  id,
  createdAt,
  resName,
  date,
  items,
  totalPrice,
  status,
  onPressFunction,
  onRateOrderPress,
  onViewResPress,
  onCancelOrderPress,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.orderTime_text}>
          Order Time - {createdAt === undefined ? 'undefined' : formatDateTime(createdAt)}
        </Text>
        {/* <Text style={styles.date_text}>{date}</Text> */}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.resName_text}>{resName}</Text>
        <ArrowRight
          width={14}
          height={14}
          style={{ color: COLOR.text_secondary_color, marginLeft: 'auto' }}
        />
      </View>
      <View style={styles.product_info_container}>
        {/* {items.slice(0, 3).map(({productID, productName, productImage}, index) => {
            <View key={index} style={styles.product_container}>
              <Image
                style={styles.product_image}
                source={{
                  uri: productImage || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
                }}
              />
              <Text style={styles.productName_text}>{productName}</Text>
            </View>;
        })} */}
        <View style={{ flex: 3, flexDirection: 'row' }}>
          {/* <View style={styles.product_container}>
            <Image
              style={styles.product_image}
              source={{
                uri: items[0].image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
              }}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName_text}>
              {items[0].name}
            </Text>
          </View>
          <View style={[styles.product_container, { marginHorizontal: 10 }]}>
            <Image
              style={styles.product_image}
              source={{
                uri: items[1].image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
              }}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName_text}>
              {items[1].name}
            </Text>
          </View>
          <View style={styles.product_container}>
            <Image
              style={styles.product_image}
              source={{
                uri: items[2].image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
              }}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName_text}>
              {items[2].name}
            </Text>
          </View> */}
          {items?.slice(0, 3).map(({ image, name }, index) => (
            <View key={index} style={styles.product_container}>
              <Image
                style={styles.product_image}
                source={{
                  uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
                }}
              />
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productName_text}>
                {name}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ flex: 1.1, justifyContent: 'center' }}>
          <Text style={styles.totalPrice_text}>
            {totalPrice === undefined ? '0.000' : formatVND(totalPrice)}đ
          </Text>
          <Text style={styles.numOfItem_text}>
            {items?.length} items {'>'}
          </Text>
        </View>
      </View>
      <View style={styles.footer_container}>
        <Text
          style={[
            styles.status_text,
            {
              color:
                status === 'STORE_CONFIRMED'
                  ? COLOR.text_pink_color
                  : status === 'DELIVERING'
                  ? COLOR.orderStatus_onGoing_text
                  : status === 'DELIVERED'
                  ? COLOR.orderStatus_completed_text
                  : status === 'CANCELED'
                  ? COLOR.orderStatus_Canceled_text
                  : COLOR.text_pending_color,
            },
          ]}
        >
          {status === 'STORE_CONFIRMED'
            ? 'CONFIRMED'
            : status === 'DELIVERING'
            ? 'Ongoing'
            : status === 'DELIVERED'
            ? 'Delivered'
            : status === 'CANCELED'
            ? 'Canceled'
            : 'Pending'}
        </Text>
        {status === 'DELIVERED' && (
          <View style={{ flexDirection: 'row', marginStart: 'auto' }}>
            <Pressable
              style={[
                styles.button,
                {
                  marginLeft: 'auto',
                  backgroundColor: COLOR.background_color,
                  borderWidth: 1,
                  borderColor: COLOR.indicator_current_color,
                },
              ]}
              onPress={onRateOrderPress}
            >
              <Text style={[styles.button_text, { color: COLOR.indicator_current_color }]}>
                Rate Order
              </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onViewResPress}>
              <Text style={[styles.button_text, { color: COLOR.background_color }]}>
                View Restaurant
              </Text>
            </Pressable>
          </View>
        )}
        {status === 'PENDING' && (
          <View style={{ flexDirection: 'row', marginStart: 'auto' }}>
            <Pressable
              style={[styles.button, { backgroundColor: COLOR.text_errorMessage_color }]}
              onPress={onCancelOrderPress}
            >
              <Text style={[styles.button_text, { color: COLOR.background_color }]}>
                Cancel Order
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.indicator_current_color,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },

  orderTime_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: COLOR.indicator_current_color,
  },

  date_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: COLOR.text_secondary_color,
    marginLeft: 'auto',
  },

  resName_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 17,
    color: COLOR.text_primary_color,
  },

  product_info_container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_press_color,
    paddingBottom: 10,
  },

  product_container: {
    flex: 1,
  },

  product_image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },

  productName_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: COLOR.text_primary_color,
    width: 75,
  },

  totalPrice_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    color: COLOR.text_primary_color,
    marginLeft: 'auto',
  },

  numOfItem_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: COLOR.text_secondary_color,
    marginLeft: 'auto',
  },

  footer_container: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
  },

  status_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLOR.indicator_current_color,
    marginStart: 5,
    padding: 5,
  },

  button_text: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
  },
});

export default OrderCard;
