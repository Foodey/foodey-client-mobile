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
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { COLOR } from '~/constants/Colors';
import { BackButton } from '~/components';
import { Search, Detail, ShoppingBag } from '~/resources/icons';
import { RestaurantTitle, FavoriteButton, ProductBar } from '~/components/discover';
import { products, restaurants } from '~/constants/TempData';
import { CartScreen } from '~/screens/discover';
import { HomeContext } from '~/contexts/HomeContext';
import {
  getMenuByRestaurantAPI,
  getCartInfoOfResAPI,
  deleteAllCartProductAPI,
} from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import { formatVND } from '../../utils/ValueConverter';
import { AppContext } from '../../contexts/AppContext';

const RestaurantMenuScreen = ({ navigation, route }) => {
  const {
    brandID,
    restaurantID,
    restaurantName,
    restaurantLogo,
    restaurantWallpaper,
    restaurantAddress,
    isUserFavorite,
  } = route.params;

  const { restaurantMenuList, setRestaurantMenuList, cartInfo, setCartInfo } =
    useContext(HomeContext);

  const { addFavoriteRestaurants, removeFavoriteRestaurants } = useContext(AppContext);

  useLayoutEffect(() => {
    const getCartInfo = async (restaurantID) => {
      try {
        const response = await getCartInfoOfResAPI(restaurantID);
        if (response.status === HTTPStatus.OK) {
          setCartInfo(response.data);
        } else {
          console.log('Unexpected error when fetching menu by restaurant');
        }
      } catch (err) {
        console.log('Unexpected error when fetching menu by restaurant' + err);
      }
    };
    getCartInfo(restaurantID);
  }, []);

  useLayoutEffect(() => {
    const getMenuByRes = async (brandID, restaurantID) => {
      try {
        const response = await getMenuByRestaurantAPI(brandID, restaurantID);
        if (response.status === HTTPStatus.OK) {
          setRestaurantMenuList(response.data);
        } else {
          console.log('Unexpected error when fetching menu by restaurant');
        }
      } catch (err) {
        console.log('Unexpected error when fetching menu by restaurant' + err);
      }
    };
    getMenuByRes(brandID, restaurantID);
  }, []);

  const onCartClearAllPress = async (restaurantID) => {
    try {
      const response = await deleteAllCartProductAPI(restaurantID);
      if (response.status === HTTPStatus.NO_CONTENT) {
        setCartInfo({});
      } else {
        console.log('Unexpected error when clearing the shop cart');
      }
    } catch (err) {
      console.log('Unexpected error when clearing the shop cart' + err);
    }
  };

  //Navigation:
  const onBackPress = () => {
    setRestaurantMenuList({});
    navigation.goBack();
  };

  const onCartCheckoutPress = () => {
    setCartVisible(false);
    navigation.navigate('ConfirmOrder_Screen', {
      restaurantID: restaurantID,
      restaurantName: restaurantName,
    });
  };

  const onFavoritePress = async () => {
    if (isFavorite) {
      setIsFavorite(!isFavorite);
      await removeFavoriteRestaurants(restaurantID);
    } else {
      setIsFavorite(!isFavorite);
      await addFavoriteRestaurants(restaurantID);
    }
  };

  //Use states
  const [isFavorite, setIsFavorite] = useState(isUserFavorite);

  const [cartVisible, setCartVisible] = useState(false);

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

  const onCartPress = () => {
    setCartVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={cartVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color} />
      <CartScreen
        restaurantID={restaurantID}
        isVisible={cartVisible}
        onBackdropPress={() => setCartVisible(false)}
        onClosePress={() => setCartVisible(false)}
        cartData={cartInfo.items}
        subtotalPrice={cartInfo.totalRealPrice}
        onDeletePress={() => onCartClearAllPress(restaurantID)}
        onCheckoutPress={onCartCheckoutPress}
      />
      <View style={{ flexDirection: 'row' }}>
        <BackButton style={[styles.header, { marginBottom: 0 }]} onPressFunction={onBackPress} />
        <Pressable style={{ marginLeft: 'auto' }}>
          <Detail width={25} height={25} />
        </Pressable>
        <Pressable style={{ marginStart: 21 }}>
          <Search width={25} height={25} style={{ color: COLOR.text_primary_color }} />
        </Pressable>
        <Pressable style={{ marginHorizontal: 21 }} onPress={onCartPress}>
          <ShoppingBag width={25} height={25} />
        </Pressable>
      </View>
      <View>
        <Image
          source={{
            uri: restaurantWallpaper || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
          }}
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
            style={{ width: '60%' }}
            name={restaurantName}
            address={restaurantAddress}
            logo={restaurantLogo}
          />
          <FavoriteButton
            style={{ marginLeft: 'auto' }}
            isFavorite={isFavorite}
            onPressFunction={() => onFavoritePress()}
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
      </View>
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
        data={restaurantMenuList.products}
        renderItem={({ item }) => (
          <ProductBar
            // style={{ margin: 25 }}
            onPressFunction={() => {
              navigation.navigate('ProductDetailOrder_Screen', {
                restaurantID: restaurantID,
                restaurantName: restaurantName,
                productID: item.id,
                productName: item.name,
                productImage: item.image,
                productPrice: item.price,
              });
            }}
            image={item.image}
            name={item.name}
            price={item.price === undefined ? '0.000' : formatVND(item.price)}
            afterDiscountPrice=""
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
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 21,
    // backgroundColor: '#0f0',
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
