import { View, Text, Pressable, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { BackButton, VoucherCard, SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import React, { useContext } from 'react';
import { ProfileScreenHeader } from '../../components/profile';

const VoucherDetailsScreen = ({ navigation, route }) => {
  const { id, name, maximum, percentages, minimumToApply, startDate, expiredDate } = route.params;

  const onBackPressFunction = () => {
    navigation.goBack();
  };

  function convertToNormalDateFormat(value) {
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
        <VoucherCard
          name={name}
          maximum={maximum}
          percentages={percentages}
          expiredDate={expiredDate}
          minimumToApply={minimumToApply}
        />
      </View>
      <View style={styles.content_container}>
        <View style={styles.detail_container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Expiration Date</Text>
            <Text style={styles.info_text}>
              {convertToNormalDateFormat(startDate)} - {convertToNormalDateFormat(expiredDate)}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Offer</Text>
            {percentages === '' ? (
              <Text style={styles.info_text}>
                Maximum discount of {maximum}k for minimum order value of {minimumToApply}k
              </Text>
            ) : (
              <Text style={styles.info_text}>
                {percentages}% discount for minimum order value of {minimumToApply}k, Maximum
                discount of {maximum}k.
              </Text>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Payment Methods</Text>
            <Text style={styles.info_text}>All payment methods.</Text>
          </View>
        </View>
        <View style={styles.footer_container}>
          <SubmitButton
            style={{ flex: 1, marginTop: 140 }}
            title={'Accept'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={() => navigation.goBack()}
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
    flex: 1,
  },

  footer_container: {
    flex: 0.75,
    paddingBottom: 20,
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
