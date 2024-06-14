import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { Bell, FullArrowLeft, OrderList, EditMenu, Star } from '../../../resources/icons';

const ShopNavigationScreen = ({ navigation, route }) => {
  const { shopName, shopID } = route.params;

  const onBackPress = () => {
    // console.log('On back Press');
    navigation.goBack();
  };

  const onOrderListPress = () => {
    navigation.navigate('SellerOrder_Screen', { shopID: shopID });
  };

  const onViewRatingPress = () => {
    navigation.navigate('SellerRating_Screen', { shopID: shopID });
  };

  const onEditShopInfoPress = () => {
    navigation.navigate('SellerRestaurant_Screen', { shopID: shopID });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
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
              style={{ color: COLOR.text_blue_color, fontFamily: 'Manrope-Medium', fontSize: 16 }}
            >
              Back
            </Text>
          </Pressable>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header_text}>
            <Text style={{ color: COLOR.text_press_color }}>|{'  '}</Text> {shopName}
          </Text>
          {/* <Bell
            width={24}
            height={24}
            color={COLOR.text_primary_color}
            style={{ marginStart: 'auto' }}
          /> */}
        </View>
        <Image source={require('../../../resources/images/Foodey-LOGO.png')} style={styles.image} />
        {/* <Image source={{uri: wallpaper || 'https://lsvn.vn/html/lsvn-web/images/no-image.png'}} */}
      </View>
      <View style={styles.navigation_bar_container}>
        <Pressable onPress={onOrderListPress} style={styles.navigation_button}>
          <OrderList width={50} height={50} color={COLOR.button_press_primary_color} />
          <Text style={styles.navigation_text}>Order List</Text>
        </Pressable>
        <Pressable
          onPress={onViewRatingPress}
          style={[
            styles.navigation_button,
            {
              borderStartWidth: 1,
              borderEndWidth: 1,
              borderStartColor: COLOR.text_press_color,
              borderEndColor: COLOR.text_press_color,
            },
          ]}
        >
          <Star width={50} height={50} color={COLOR.star_icon_color} />
          <Text style={styles.navigation_text}>View Rating</Text>
        </Pressable>
        <Pressable onPress={onEditShopInfoPress} style={styles.navigation_button}>
          <EditMenu width={50} height={50} color={COLOR.button_press_primary_color} />
          <Text style={styles.navigation_text}>Edit Infos</Text>
        </Pressable>
      </View>
      <View style={{ flex: 2 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header_container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  navigation_bar_container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header_text: {
    fontFamily: 'Manrope-Bold',
    color: COLOR.text_primary_color,
    fontSize: 18,
    marginEnd: 30,
    marginStart: 10,
  },

  image: {
    flex: 1,
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },

  navigation_button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  navigation_text: {
    fontFamily: 'Manrope-Bold',
    color: COLOR.text_primary_color,
    fontSize: 16,
    marginTop: 5,
  },
});

export default ShopNavigationScreen;
