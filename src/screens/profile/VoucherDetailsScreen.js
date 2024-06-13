import { View, Text, Pressable, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { BackButton, VoucherCard, SubmitButton } from '~/components';
import { COLOR } from '../../constants/Colors';
import React, { useContext } from 'react';
import { ProfileScreenHeader } from '../../components/profile';
import { formatDateTime } from '../../utils/ValueConverter'; //use this format date time later since the data getting from server already handle UTC hour

const VoucherDetailsScreen = ({ navigation, route }) => {
  const {
    id,
    isSeller,
    code,
    method,
    minimumToApply,
    startDate,
    expiredDate,
    quantity,
    discountAmount,
  } = route.params;

  const onBackPressFunction = () => {
    navigation.goBack();
  };

  const onDeletePress = () => {
    //
  };

  //Can delete later since UTC hour has already been handled at BE
  function formatDateTime(value) {
    try {
      // Parse the ISOString date time into a Date object
      const date = new Date(value);

      // Extract and format date components according to your custom format
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');

      const result = `${day}/${month}/${year} ${hours}:${minutes}`;
      return result;
    } catch (error) {
      console.error('Error parsing ISOString date:', error);
      return null; // Return None on parsing errors
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader title="Voucher Detail" onBackPressFunction={onBackPressFunction} />
      <View style={{ marginHorizontal: 21 }}>
        <VoucherCard code={code} expiredDate={expiredDate} minimumToApply={minimumToApply} />
      </View>
      <View style={styles.content_container}>
        <View style={styles.detail_container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Expiration Date</Text>
            <Text style={styles.info_text}>
              {formatDateTime(startDate)} - {formatDateTime(expiredDate)}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Offer</Text>
            {method === 'SPECIAL_AMOUNT' ? (
              <Text style={styles.info_text}>
                Maximum discount of 200k for minimum order value of {minimumToApply}k.
              </Text>
            ) : (
              <Text style={styles.info_text}>
                20% discount for minimum order value of {minimumToApply}k.
              </Text>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Payment Methods</Text>
            <Text style={styles.info_text}>Cash payment only.</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Number of Vouchers</Text>
            <Text style={styles.info_text}>{quantity} voucher(s)</Text>
          </View>
        </View>
        <View style={styles.footer_container}>
          <SubmitButton
            style={{ flex: 1, marginVertical: 60 }}
            title={isSeller ? 'Delete' : 'Accept'}
            buttonColor={isSeller ? COLOR.button_red_color : COLOR.button_primary_color}
            hoverColor={isSeller ? COLOR.button_press_red_color : COLOR.button_press_primary_color}
            onPressFunction={isSeller ? () => onDeletePress() : () => onBackPressFunction()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  content_container: {
    flex: 1,
    marginHorizontal: 21,
  },

  detail_container: {
    flex: 1.5,
  },

  footer_container: {
    flex: 0.75,
    // backgroundColor: '#f0f'
  },

  title_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 24,
    color: COLOR.text_primary_color,
  },

  info_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: COLOR.text_primary_color,
  },
});

export default VoucherDetailsScreen;
