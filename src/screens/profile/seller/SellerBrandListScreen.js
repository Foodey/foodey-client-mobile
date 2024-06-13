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
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { restaurants } from '../../../constants/TempData';
import { FullyRestaurantCard } from '../../../components/home';

const SellerBrandListScreen = ({ navigation }) => {
  const onBrandPress = (item) => {
    navigation.navigate('SellerShopList_Screen');
  };

  const onCreateBrandPress = () => {
    navigation.navigate('BrandCreation_Screen');
  };

  const onBackPress = () => {
    // console.log('OnBackPress');
    navigation.goBack();
  };

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
            My Brand ({restaurants.length})
          </Text>
        </Pressable>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={styles.dynamic_container}
        data={restaurants}
        renderItem={({ item }) => (
          <FullyRestaurantCard
            // style={{ margin: 25 }}
            wallpaper={item.wallpaper}
            logo={item.logo}
            name={item.name}
            avgReview={item.rating}
            onPressFunction={() => onBrandPress(item)}
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
