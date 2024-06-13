import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { restaurants } from '../../../constants/TempData';
import { FullyRestaurantCard } from '../../../components/home';
import { getShopOfBrandAPI } from '../../../apiServices/SellerService';
import HTTPStatus from '../../../constants/HTTPStatusCodes';

const SellerShopListScreen = ({ navigation, route }) => {
  const { brandID, brandName } = route.params;

  const onResPress = (item) => {
    navigation.navigate('ShopNavigation_Screen');
  };

  const onCreateShopPress = () => {
    navigation.navigate('ShopCreation_Screen');
  };

  const onBackPress = () => {
    // console.log('OnBackPress');
    navigation.goBack();
  };

  const [shopList, setShopList] = useState([]);

  useLayoutEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await getShopOfBrandAPI(brandID);
        if (response.status === HTTPStatus.OK) {
          setShopList(response.data.content);
        } else {
          console.log('Error when fetching seller brand list');
        }
      } catch (err) {
        console.log('Error when fetching seller brand list ' + err);
      }
    };

    fetchShop();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title={brandName} onLeftButtonPress={onBackPress} />
      <View style={styles.static_container}>
        <Pressable style={styles.create_button} onPress={onCreateShopPress}>
          <Text style={styles.create_button_text}>+ Create New Shop</Text>
        </Pressable>
        <Pressable
          //   onPress={onRestaurantSelected} --Use Pressable here for future tab navigate when having more tab
          style={[
            styles.switcher_option_container,
            // {
            //   borderBottomColor: isRestaurantSelected
            //     ? COLOR.indicator_current_color
            //     : COLOR.background_color,
            // },
          ]}
        >
          <Text
            style={[
              styles.switcher_option_text,
              //   {
              //     color: isRestaurantSelected
              //       ? COLOR.indicator_current_color
              //       : COLOR.text_primary_color,
              //   },
            ]}
          >
            My Shop ({shopList.length})
          </Text>
        </Pressable>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={styles.dynamic_container}
        data={shopList}
        renderItem={({ item }) => (
          <FullyRestaurantCard
            // style={{ margin: 25 }}
            wallpaper={item.wallpaper}
            logo={item.logo}
            name={item.name}
            avgReview={item.rating}
            onPressFunction={() => onResPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  static_container: {},

  dynamic_container: {
    flex: 1,
    marginTop: 15,
  },

  create_button: {
    backgroundColor: COLOR.indicator_current_color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    margin: 21,
  },

  create_button_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: COLOR.background_color,
  },

  switcher_option_container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.button_secondary_color,
    marginHorizontal: 21,
    // backgroundColor: "#f0f"
  },

  switcher_option_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 17.5,
    color: COLOR.button_secondary_color,
  },
});

export default SellerShopListScreen;
