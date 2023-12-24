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
import React, { useState, useContext, useEffect } from 'react';
import { COLOR } from '~/constants/Colors';
import { BackButton } from '~/components';
import { HappyBag, Detail, ShoppingBag } from '~/resources/icons';
import { ProductQuantityAdjuster, FavoriteButton, DishBar } from '~/components/discover';
import { SuccessNotifyModal } from '~/components/messageBoxes';
import { CartScreen } from '~/screens/discover';
import { products } from '~/constants/TempData';
import { HomeContext } from '~/contexts/HomeContext';
import { AppContext } from '~/contexts/AppContext';

const ProductDetailOrderScreen = ({ navigation, route }) => {
  const { addProductToCart, getCartInfoByResID, deleteAllCartInfoByResID, cartInfo, setCartInfo } =
    useContext(HomeContext);

  const { requestNewAccessToken } = useContext(AppContext);

  const { productResID, productID, productName, productImage, productPrice } = route.params;

  //Navigation:
  const onGoBack = () => {
    navigation.goBack();
  };

  //Use states
  const [isFavorite, setIsFavorite] = useState(false);
  const [successAddingToCartVisible, setSuccessAddingToCartVisible] = useState(false);

  const [cartVisible, setCartVisible] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productPrice);

  useEffect(() => {
    const price = parseFloat(productPrice);
    let newTotalPrice = price * productQuantity;

    // if (newTotalPrice >= 1000) {
    //   newTotalPrice =
    //     newTotalPrice.toString().slice(0, 1) + '.' + newTotalPrice.toString().slice(1);
    //   setTotalPrice(newTotalPrice.toString());
    // } else {
    //   setTotalPrice(newTotalPrice.toString());
    // }
    setTotalPrice(newTotalPrice.toString());
  }, [productQuantity]);

  //Functions:

  const onOKPressHandler = () => {
    getCartInfoByResID(productResID);
    setSuccessAddingToCartVisible(false);
    navigation.goBack();
  };

  const addToCartPress = () => {
    let check = addProductToCart(productResID, productID, productQuantity);
    setSuccessAddingToCartVisible(true);
    // if(check)
    // {
    //   setSuccessAddingToCartVisible(true);
    // }
    // else
    // {
    //   let isRequestNewAccessTokenSuccess = requestNewAccessToken();
    //   if(isRequestNewAccessTokenSuccess)
    //   {
    //     addProductToCart(productResID, productID, productQuantity);
    //     console.log('Successfully adding product into cart after request new access token');
    //     setSuccessAddingToCartVisible(true);
    //   }
    //   else
    //     console.log('Unexpected error while adding product a cart');
    // }
  };

  const onSubtractPress = () => {
    if (productQuantity !== 1) setProductQuantity(productQuantity - 1);
  };

  const onAddingPress = () => {
    setProductQuantity(productQuantity + 1);
  };

  const onCartCheckoutPress = () => {
    setCartVisible(false);
    navigation.navigate('ConfirmOrder_Screen', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={cartVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color} />
      <SuccessNotifyModal
        visible={successAddingToCartVisible}
        title="Product added to cart successfully"
        onOKPressHandler={onOKPressHandler}
      />
      <CartScreen
        isVisible={cartVisible}
        onBackdropPress={() => setCartVisible(false)}
        onClosePress={() => setCartVisible(false)}
        cartData={cartInfo.items}
        subtotalPrice={cartInfo.totalPrice}
        onDeletePress={() => deleteAllCartInfoByResID(restaurantID)}
        onCheckoutPress={onCartCheckoutPress}
      />
      <View style={{ flexDirection: 'row' }}>
        <BackButton style={[styles.header, { marginBottom: 0 }]} onPressFunction={onGoBack} />
        <Pressable
          style={{ marginHorizontal: 21, marginLeft: 'auto' }}
          onPress={() => setCartVisible(true)}
        >
          <ShoppingBag width={25} height={25} />
        </Pressable>
      </View>
      <View style={{ marginHorizontal: 21, marginVertical: 20 }}>
        <Image
          source={{ uri: productImage || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
          style={[
            {
              width: '100%',
              height: 200,
            },
          ]}
        />
        <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.product_name_text]}>
          {productName}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 21, marginVertical: 10 }}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.total_price, { flex: 2 }]}>
          {totalPrice} VND
        </Text>
        <ProductQuantityAdjuster
          buttonRadius={35}
          quantity={productQuantity}
          style={{ flex: 1 }}
          onSubtractPress={onSubtractPress}
          onAddingPress={onAddingPress}
        />
      </View>
      <View style={styles.footer_container}>
        <FavoriteButton
          isFavorite={isFavorite}
          onPressFunction={() => setIsFavorite(!isFavorite)}
        />
        <Pressable style={styles.addToCart_button} onPress={addToCartPress}>
          <HappyBag width={21} height={21} style={{ color: COLOR.background_color }} />
          <Text style={styles.addToCart_text}>Add to Cart</Text>
        </Pressable>
      </View>
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

  product_name_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
  },

  total_price: {
    fontFamily: 'Manrope-Medium',
    fontSize: 30,
    color: COLOR.indicator_current_color,
  },

  footer_container: {
    flexDirection: 'row',
    marginTop: 'auto',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 21,
  },

  addToCart_button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: COLOR.indicator_current_color,
    borderRadius: 18,
    marginStart: 20,
  },

  addToCart_text: {
    fontFamily: 'Manrope-Bold',
    color: COLOR.background_color,
    fontSize: 18,
    marginStart: 5,
  },
});

export default ProductDetailOrderScreen;
