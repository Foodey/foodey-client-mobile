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
import { getSellerBrandAPI } from '../../../apiServices/SellerService';
import HTTPStatus from '../../../constants/HTTPStatusCodes';

const SellerBrandListScreen = ({ navigation }) => {
  const onBrandPress = (item) => {
    navigation.navigate('SellerShopList_Screen', { brandID: item?.id, brandName: item?.name });
  };

  const onCreateBrandPress = () => {
    navigation.navigate('BrandCreation_Screen');
  };

  const onBackPress = () => {
    // console.log('OnBackPress');
    navigation.goBack();
  };

  useLayoutEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await getSellerBrandAPI(5);
        if (response.status === HTTPStatus.OK) {
          setBrandList(response.data.content);
        } else {
          console.log('Error when fetching seller brand list');
        }
      } catch (err) {
        console.log('Error when fetching seller brand list ' + err);
      }
    };

    fetchBrand();
  }, []);

  const [brandList, setBrandList] = useState([]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Your Brands" onLeftButtonPress={onBackPress} />
      <View style={styles.static_container}>
        <Pressable style={styles.create_button} onPress={onCreateBrandPress}>
          <Text style={styles.create_button_text}>+ Create New Brand</Text>
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
            My Brand ({brandList.length})
          </Text>
        </Pressable>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={styles.dynamic_container}
        data={brandList}
        renderItem={({ item }) => (
          <FullyRestaurantCard
            // style={{ margin: 25 }}
            wallpaper={item?.wallpaper}
            logo={item?.logo}
            name={item?.name}
            onPressFunction={() => onBrandPress(item)}
            createdDate={item?.createdAt}
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
    backgroundColor: COLOR.button_primary_color,
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

export default SellerBrandListScreen;
