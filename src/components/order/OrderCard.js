import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { COLOR } from '~/constants/Colors';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function OrderCard({
  style,
  id,
  resName,
  date,
  items,
  totalPrice,
  onPressFunction,
  completedOrder,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.id_text}>Order # {id}</Text>
        <Text style={styles.date_text}>{date}</Text>
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
          <View style={styles.product_container}>
            <Image
              style={styles.product_image}
              source={{
                uri: items[0].productImage || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
              }}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName_text}>
              {items[0].productName}
            </Text>
          </View>
          <View style={[styles.product_container, { marginHorizontal: 10 }]}>
            <Image
              style={styles.product_image}
              source={{
                uri: items[1].productImage || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
              }}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName_text}>
              {items[1].productName}
            </Text>
          </View>
          <View style={styles.product_container}>
            <Image
              style={styles.product_image}
              source={{
                uri: items[2].productImage || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
              }}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.productName_text}>
              {items[2].productName}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.totalPrice_text}>{totalPrice}</Text>
          <Text style={styles.numOfItem_text}>
            {items.length} items {'>'}
          </Text>
        </View>
      </View>
      <View style={styles.footer_container}>
        <Text
          style={[
            styles.status_text,
            {
              color: completedOrder
                ? COLOR.orderStatus_completed_text
                : COLOR.orderStatus_onGoing_text,
            },
          ]}
        >
          {completedOrder ? 'Completed' : 'Ongoing'}
        </Text>
        <Pressable style={[styles.button, { marginLeft: 'auto' }]}>
          <Text style={[styles.button_text, { color: COLOR.indicator_current_color }]}>Review</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: COLOR.indicator_current_color }]}>
          <Text style={[styles.button_text, { color: COLOR.background_color, borderWidth: 0 }]}>
            Re-order
          </Text>
        </Pressable>
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

  id_text: {
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
  },

  productName_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: COLOR.text_primary_color,
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
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },

  button: {
    width: 85,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR.indicator_current_color,
    marginHorizontal: 5,
  },

  button_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },
});

export default OrderCard;
