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

const SellerHomeScreen = ({ navigation }) => {
  const onOrderListPress = () => {
    navigation.navigate('SellerOrder_Screen');
  };

  const onViewRatingPress = () => {
    navigation.navigate('SellerRating_Screen');
  };

  const onEditMenuPress = () => {
    navigation.navigate('SellerRestaurantMenu_Screen');
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
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <FullArrowLeft width={24} height={24} color={COLOR.text_blue_color} />
          </TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header_text}>
            Cơm Ông Già - Chi Nhánh 1
          </Text>
          <Bell
            width={24}
            height={24}
            color={COLOR.text_primary_color}
            style={{ marginStart: 'auto' }}
          />
        </View>
        <Image source={require('../../../resources/images/Foodey-LOGO.png')} style={styles.image} />
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
        <Pressable onPress={onEditMenuPress} style={styles.navigation_button}>
          <EditMenu width={50} height={50} color={COLOR.button_press_primary_color} />
          <Text style={styles.navigation_text}>Edit Menu</Text>
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

export default SellerHomeScreen;
