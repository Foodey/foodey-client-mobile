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
import { products, restaurants } from '~/constants/TempData';

const ProductDetailOrderScreen = ({ navigation }) => {
  //Navigation:

  //Use states
  const [isFavorite, setIsFavorite] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(products[0].price);

  useEffect(() => {
    const productPrice = parseFloat(products[0].price);
    let newTotalPrice = productPrice * productQuantity;

    if (newTotalPrice >= 1000) {
      newTotalPrice =
        newTotalPrice.toString().slice(0, 1) + '.' + newTotalPrice.toString().slice(1);
      setTotalPrice(newTotalPrice.toString());
    } else {
      setTotalPrice(newTotalPrice.toString());
    }
  }, [productQuantity]);

  //Functions:
  const onSubtractPress = () => {
    if (productQuantity !== 1) setProductQuantity(productQuantity - 1);
  };

  const onAddingPress = () => {
    setProductQuantity(productQuantity + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={{ flexDirection: 'row' }}>
        <BackButton style={[styles.header, { marginBottom: 0 }]} />
        <Pressable style={{ marginHorizontal: 21, marginLeft: 'auto' }}>
          <ShoppingBag width={25} height={25} />
        </Pressable>
      </View>
      <View style={{ marginHorizontal: 21, marginVertical: 20 }}>
        <Image
          source={products[0].image}
          style={[
            {
              width: '100%',
              height: 200,
            },
          ]}
        />
        <Text ellipsizeMode="tail" numberOfLines={2} style={[styles.product_name_text]}>
          {products[0].name}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 21, marginVertical: 10 }}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.total_price, { flex: 2 }]}>
          {totalPrice}.000 VND
        </Text>
        <ProductQuantityAdjuster
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
        <Pressable style={styles.addToCart_button}>
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
