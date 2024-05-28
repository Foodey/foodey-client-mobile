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

const MyVouchersScreen = ({ navigation }) => {
  const onBackPressFunction = () => {
    navigation.goBack();
  };

  function convertToVND(value) {
    value = parseInt(value);

    if (value < 0) return null;

    const thousands = Math.floor(value / 1000);
    const remainder = value % 1000;

    if (remainder === 0) {
      return `${thousands}`;
    }

    const formattedRemainder = remainder.toString().slice(0, -2); // Remove trailing zero

    const result = `${thousands},${formattedRemainder}`;
    return result;
  }

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
            // imageURL={item.imageURL}
            name={item.name}
            maximum={convertToVND(item.maximum)}
            percentages={item.percentages}
            expiredDate={item.expiredDate}
            minimumToApply={convertToVND(item.minimumToApply)}
            isIconVisible={true}
            onPressFunction={() => {
              navigation.navigate('VoucherDetails_Screen', {
                id: item?.id,
                name: item?.name,
                maximum: convertToVND(item?.maximum),
                percentages: item?.percentages,
                minimumToApply: convertToVND(item?.minimumToApply),
                startDate: item?.startDate,
                expiredDate: item?.expiredDate,
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
