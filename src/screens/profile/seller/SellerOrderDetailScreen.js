import { View, Text, StyleSheet, StatusBar, Pressable, Image, ScrollView } from 'react-native';
import React, { useState, useLayoutEffect, useContext } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { AddressCard, SubmitButton } from '../../../components';
import { Note, ArrowRight, Buy } from '../../../resources/icons';
import { formatVND } from '../../../utils/ValueConverter';
import { NoteModal } from '../../../components/messageBoxes';
import { SellerContext } from '../../../contexts/SellerContext';
import { cancelOrderAPI } from '../../../apiServices/HomeService';

const SellerOrderDetailScreen = ({ navigation, route }) => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [noteValue, setNoteValue] = useState('');

  const onConfirmPress = () => {
    //
  };

  const onDeclinePress = () => {
    //
  };

  const onCallPress = () => {
    //
  };

  const onModalClosePress = (note) => {
    setNoteValue(note);
    setIsNoteVisible(false);
    //
  };

  const { itemInfos, status } = route.params;

  useLayoutEffect(() => {
    const fetchPending = async () => {};
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={isNoteVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color} />
      <NoteModal noteValue={noteValue} isVisible={isNoteVisible} onClosePress={onModalClosePress} />
      <IntroHeader title="Order Details" onLeftButtonPress={() => navigation.goBack()} />
      <AddressCard
        title="Delivery Address"
        name="Nguyen Phu Thinh"
        phoneNumber="0865474654"
        address="69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương"
        disabled={true}
        isCanCall={true}
        onCallPress={onCallPress}
      />
      <Pressable
        onPress={() => setIsNoteVisible(true)}
        style={[styles.voucher_container, { borderColor: COLOR.text_primary_color }]}
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        style={styles.ordered_product_container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Buy width={25} height={25} />
          <Text
            style={{
              fontFamily: 'Manrope-Bold',
              fontSize: 16,
              color: COLOR.indicator_current_color,
              marginStart: 10,
            }}
          >
            Product List
          </Text>
        </View>
        {itemInfos?.map(({ image, name, description, quantity, totalPrice }, index) => (
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
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginVertical: 5,
        }}
      >
        {status !== 'PENDING' ||
          (status !== 'STORE_CONFIRMED' && (
            <SubmitButton
              style={{ flex: 1, marginEnd: 10 }}
              title={'Decline'}
              buttonColor={COLOR.button_red_color}
              hoverColor={COLOR.button_press_red_color}
              onPressFunction={onDeclinePress}
            />
          ))}
        {status !== 'DELIVERING' && (
          <SubmitButton
            style={{ flex: 1 }}
            title={status === 'STORE_CONFIRMED' ? 'Ready To Delivered' : 'Confirm'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={onConfirmPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
    paddingHorizontal: 10,
  },

  ordered_product_container: {
    borderWidth: 1,
    borderColor: COLOR.indicator_current_color,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    height: '55%',
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
});

export default SellerOrderDetailScreen;
