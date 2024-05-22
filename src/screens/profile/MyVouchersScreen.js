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
      <View style={styles.header_container}>
        <BackButton style={styles.back_button} onPressFunction={onBackPressFunction} />
        <Text style={styles.header_text}>Active Vouchers</Text>
      </View>
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
                id: item.id,
                name: item.name,
                maximum: convertToVND(item.maximum),
                percentages: item.percentages,
                minimumToApply: convertToVND(item.minimumToApply),
                startDate: item.startDate,
                expiredDate: item.expiredDate,
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
