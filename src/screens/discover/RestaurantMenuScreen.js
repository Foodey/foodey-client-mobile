import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import React, { useState, useContext, useRef } from 'react';
import { COLOR } from '~/constants/Colors';
import { BackButton } from '~/components';
import { Search, Detail, ShoppingBag } from '~/resources/icons';
import { RestaurantTitle, FavoriteButton, ProductBar } from '~/components/discover';
import { products, restaurants } from '~/constants/TempData';

const RestaurantMenuScreen = ({ navigation }) => {
  //Navigation:

  //Use states
  const [isFavorite, setIsFavorite] = useState(false);

  //Animations:
  // const scrollY = useRef(new Animated.Value(0)).current;

  // const translateHeaderImage = scrollY.interpolate({
  //   inputRange: [0, 217],
  //   outputRange: [0, -217],
  //   extrapolate: 'clamp',
  // });

  // const opacityHeaderImage = scrollY.interpolate({
  //   inputRange: [0, 217],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp',
  // });

  // const translateResTitle = scrollY.interpolate({
  //   inputRange: [0, 183],
  //   outputRange: [0, -183],
  //   extrapolate: 'clamp',
  // });

  // const translateFlatList = scrollY.interpolate({
  //   inputRange: [0, 183],
  //   outputRange: [0, -183],
  //   extrapolate: 'clamp',
  // });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={{ flexDirection: 'row' }}>
        <BackButton style={[styles.header, { marginBottom: 0 }]} />
        <Pressable style={{ marginLeft: 'auto' }}>
          <Detail width={25} height={25} />
        </Pressable>
        <Pressable style={{ marginStart: 21 }}>
          <Search width={25} height={25} style={{ color: COLOR.text_primary_color }} />
        </Pressable>
        <Pressable style={{ marginHorizontal: 21 }}>
          <ShoppingBag width={25} height={25} />
        </Pressable>
      </View>
      <Animated.View>
        <Animated.Image
          source={require('~/resources/images/kfc-wallpaper.png')} //updating this
          style={[
            {
              width: '100%',
              height: 180,
              // transform: [{ translateY: translateHeaderImage }],
              // opacity: opacityHeaderImage,
            },
          ]}
        />
        <View style={[styles.res_title_container]}>
          <RestaurantTitle
            style={{ flex: 3 }}
            logoLink={restaurants[1].logoLink}
            name={restaurants[1].name}
            address={restaurants[1].address.split(',')[1]}
          />
          <FavoriteButton
            isFavorite={isFavorite}
            onPressFunction={() => setIsFavorite(!isFavorite)}
          />
        </View>
        {/* <Animated.View
          style={[
            styles.res_info_container,
            // { transform: [{ translateY: translateResInfo }] },
            { opacity: opacityResInfo },
          ]}
        >
          <RestaurantInfo avgRating={4.5} estimateTime={30} category="Burgers" />
        </Animated.View> */}
      </Animated.View>
      <View style={styles.separator}>
        <Text style={styles.separator_text}>MENU</Text>
      </View>
      <Animated.FlatList
        style={[styles.scrollView_container]}
        showsVerticalScrollIndicator={false}
        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        //   useNativeDriver: true,
        // })}
        // scrollEventThrottle={1}
        data={products}
        renderItem={({ item }) => (
          <ProductBar
            // style={{ margin: 25 }}
            image={item.image}
            name={item.name}
            price={item.price}
            afterDiscountPrice="50.000"
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

  header: {
    height: 35,
    marginHorizontal: 21,
    marginBottom: 15,
    marginTop: 2,
  },

  res_title_container: {
    position: 'relative',
    flexDirection: 'row',
    width: 'auto',
    height: 100,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 21,
  },

  scrollView_container: {},

  separator: {
    width: '100%',
    height: 60,
    backgroundColor: COLOR.indicator_color,
    alignItems: 'center',
    justifyContent: 'center',
  },

  separator_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 17,
    color: COLOR.text_primary_color,
  },
});

export default RestaurantMenuScreen;
