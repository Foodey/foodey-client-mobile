import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import { SubmitButton, BackButton, VoucherCard } from '~/components';
import { COLOR } from '~/constants/Colors';
import React, { useContext } from 'react';
import { myVouchers } from '../../constants/TempData';

const MyVouchersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton style={styles.back_button} />
        <Text style={styles.header_text}>Active Vouchers</Text>
      </View>
      <FlatList
        style={styles.content_container}
        showsVerticalScrollIndicator={false}
        data={myVouchers}
        renderItem={({ item }) => (
          <VoucherCard
            name={item.name}
            maximum={item.maximum}
            percentages={item.percentages}
            expireTime={item.expireTime}
            minimumToApply={item.minimumToApply}
          />
        )}
      />
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
    height: '80%',
    // backgroundColor: '#0f0',
    paddingHorizontal: 21,
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
});

export default MyVouchersScreen;
