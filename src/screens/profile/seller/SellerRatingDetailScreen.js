import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { AddressCard, SubmitButton, StarRating } from '../../../components';
import { Note, ArrowRight, Buy } from '../../../resources/icons';
import { formatVND } from '../../../utils/ValueConverter';
import { NoteModal } from '../../../components/messageBoxes';

const SellerRatingDetailScreen = ({ navigation, route }) => {
  const { itemInfos } = route.params;

  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [orderRating, setOrderRating] = useState(0);
  const [comment, setComment] = useState('');

  const onConfirmPress = () => {
    //
  };

  const onDeclinePress = () => {
    //
  };

  const onCallPress = () => {
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={isNoteVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color} />
      <NoteModal
        noteValue={noteValue}
        isVisible={isNoteVisible}
        backdropPress={onBackdropPres}
        onClosePress={onModalClosePress}
        editable={false}
      />
      <IntroHeader title="Rating Details" onLeftButtonPress={() => navigation.goBack()} />
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <StarRating
            maxStar={5}
            value={orderRating}
            onRatingChange={(value) => setOrderRating(value)}
            isEditable={false}
          />
          <Text
            style={[
              {
                fontFamily: 'Manrope-SemiBold',
                fontSize: 20,
                marginTop: 15,
                color: COLOR.text_pink_color,
              },
            ]}
          >
            {orderRating === 1
              ? 'Very Bad'
              : orderRating === 2
              ? 'Bad'
              : orderRating === 3
              ? 'Normal'
              : orderRating === 4
              ? 'Good'
              : orderRating === 5
              ? 'Excellent'
              : 'Not Rated'}
          </Text>
        </View>
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
        <View style={styles.ordered_product_container} showsVerticalScrollIndicator={false}>
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
        </View>
        <Text
          style={[
            {
              fontFamily: 'Manrope-SemiBold',
              fontSize: 20,
              color: COLOR.text_primary_color,
              marginTop: 10,
              marginBottom: 0,
            },
          ]}
        >
          Comment:{' '}
        </Text>
        <View style={styles.text_input_container}>
          <TextInput
            editable={false}
            value={comment}
            multiline
            placeholder="Leave your comment here..."
            style={styles.note_text}
            textAlignVertical="top"
            onChangeText={(value) => setComment(value)}
          />
          <Text
            style={{
              marginStart: 'auto',
              marginTop: 'auto',
              fontFamily: 'Manrope-Medium',
              fontSize: 16,
              color:
                comment.length > 200 ? COLOR.text_errorMessage_color : COLOR.text_secondary_color,
            }}
          >
            {comment.length}/200
          </Text>
        </View>
      </ScrollView>
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

  text_input_container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.text_press_color,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  note_text: {
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_primary_color,
    fontSize: 20,
  },
});

export default SellerRatingDetailScreen;
