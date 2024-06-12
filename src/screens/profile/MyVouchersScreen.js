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
import { ProfileScreenHeader } from '../../components/profile';
import { formatTruncatedVND } from '../../utils/ValueConverter';

const MyVouchersScreen = ({ navigation }) => {
  const onBackPressFunction = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader title="Active Vouchers" onBackPressFunction={onBackPressFunction} />
      <FlatList
        style={styles.content_container}
        showsVerticalScrollIndicator={false}
        data={myVouchers}
        renderItem={({ item }) => (
          <VoucherCard
            isIconVisible={true}
            // imageURL={item.imageURL}
            code={item?.code}
            method={item?.method}
            expiredDate={item?.expiredDate}
            minimumToApply={formatTruncatedVND(item?.minimumToApply)}
            onPressFunction={() => {
              navigation.navigate('VoucherDetails_Screen', {
                id: item?.id,
                code: item?.code,
                method: item?.method,
                minimumToApply: formatTruncatedVND(item?.minimumToApply),
                // quantity: item?.quantity,
                // discountAmount: item?.discountAmount,
                startDate: item?.startDate,
                expiredDate: item?.expiredDate,
                isSeller: false,
              });
            }}
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

  content_container: {
    // backgroundColor: '#0f0',
    paddingHorizontal: 21,
  },
});

export default MyVouchersScreen;
