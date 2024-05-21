import { View, Text, Pressable, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { BackButton, VoucherCard, SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import React, { useContext } from 'react';

const VoucherDetailsScreen = ({ navigation, route }) => {
  const { id, name, maximum, percentages, expireDate, minimumToApply } = route.params;

  const onBackPressFunction = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton style={styles.back_button} onPressFunction={onBackPressFunction} />
        <Text style={styles.header_text}>Active Vouchers</Text>
      </View>
      <View style={{ marginHorizontal: 21 }}>
        <VoucherCard
          name={name}
          maximum={maximum}
          percentages={percentages}
          expireTime="2"
          minimumToApply={minimumToApply}
        />
      </View>
      <View style={styles.content_container}>
        <View style={styles.detail_container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title_text}>Expiration Date</Text>
            <Text style={styles.info_text}>{expireDate}</Text>
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

  header_container: {
    height: '20%',
    marginHorizontal: 21,
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

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    flex: 2.5,
    marginTop: 20,
  },

  back_button: {
    flex: 1,
    alignItems: 'center',
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
