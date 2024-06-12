import { View, Text, Pressable, StyleSheet, FlatList, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { sellerOrders } from '../../../constants/TempData';
import { SellerProductBar } from '../../../components/seller';

const SellerRestaurantMenuScreen = ({ navigation }) => {
  const [page, setPage] = useState('0');

  const onMenuPress = () => {
    if (page !== '0') setPage('0');
  };

  const onVoucherPress = () => {
    if (page !== '1') setPage('1');
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onAddPress = () => {
    navigation.navigate('AddEditProduct_Screen', { isEdit: false });
  };

  const onProductPress = (item) => {
    navigation.navigate('AddEditProduct_Screen', { isEdit: true });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.button_primary_color} />
      <View style={styles.header_container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={onBackPress}
          >
            <Text
              style={{ color: COLOR.background_color, fontFamily: 'Manrope-Medium', fontSize: 16 }}
            >
              Back
            </Text>
          </Pressable>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header_text}>
            <Text style={{ color: COLOR.text_press_color }}>|{'  '}</Text> Cơm tấm Ông Già - KTX Khu
            B DHQG
          </Text>
          {/* <Bell
            width={24}
            height={24}
            color={COLOR.background_color}
            style={{ alignSelf: 'flex-end', marginStart: 5, marginBottom: 10,}}
          /> */}
        </View>
      </View>
      <View style={styles.switcher_container}>
        <Pressable
          onPress={onMenuPress}
          style={[
            styles.switcher_option_container,
            {
              borderBottomColor:
                page === '0' ? COLOR.button_press_primary_color : COLOR.background_color,
            },
          ]}
        >
          <Text
            style={[
              styles.switcher_option_text,
              {
                color: page === '0' ? COLOR.button_press_primary_color : COLOR.text_primary_color,
              },
            ]}
          >
            Menu
          </Text>
        </Pressable>
        <Pressable
          onPress={onVoucherPress}
          style={[
            styles.switcher_option_container,
            {
              borderBottomColor:
                page === '1' ? COLOR.button_press_primary_color : COLOR.background_color,
            },
          ]}
        >
          <Text
            style={[
              styles.switcher_option_text,
              {
                color: page === '1' ? COLOR.button_press_primary_color : COLOR.text_primary_color,
              },
            ]}
          >
            Voucher
          </Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Pressable
          style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
          onPress={onAddPress}
        >
          <Text
            style={{ fontFamily: 'Manrope-Bold', fontSize: 18, color: COLOR.text_secondary_color }}
          >
            + Add
          </Text>
        </Pressable>
        <Text
          style={{
            fontFamily: 'Manrope-Bold',
            fontSize: 16,
            color: COLOR.text_secondary_color,
            marginStart: 'auto',
          }}
        >
          {sellerOrders[0]?.items?.length} product(s)
        </Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 5 }}
        data={sellerOrders[0]?.items}
        renderItem={({ item }) => (
          <SellerProductBar
            onProductPress={() => onProductPress(item)}
            name={item?.name}
            image={item?.image}
            price={item?.productPrice}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header_container: {
    backgroundColor: COLOR.button_primary_color,
  },

  header_text: {
    fontFamily: 'Manrope-Bold',
    color: COLOR.background_color,
    fontSize: 18,
    marginStart: 10,
    paddingVertical: 10,
  },

  switcher_container: {
    flexDirection: 'row',
    backgroundColor: COLOR.background_color,
  },

  switcher_option_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  switcher_option_text: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 17.5,
  },
});

export default SellerRestaurantMenuScreen;
