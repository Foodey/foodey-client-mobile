import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { COLOR } from '~/constants/Colors';
import { BackButton } from '~/components';
import { Search, Detail, ShoppingBag } from '~/resources/icons';
import { RestaurantTitle, FavoriteButton, RestaurantInfo } from '~/components/discover';
import { restaurants } from '~/constants/TempData';

const RestaurantMenuScreen = ({ navigation }) => {
  //Navigation:

  //Use states
  const [isFavorite, setIsFavorite] = useState(false);

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
      <ScrollView style={styles.scrollView_container} showsVerticalScrollIndicator={false}>
        <Image
          source={require('~/resources/images/kfc-wallpaper.png')}
          style={{ width: '100%', height: 180 }}
        />
        <View style={styles.res_title_container}>
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
        <RestaurantInfo
          style={styles.res_info_container}
          avgRating={4.5}
          estimateTime={30}
          category="Burgers"
        />
      </ScrollView>
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
    width: 'auto',
    height: 100,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 21,
  },

  res_info_container: {
    width: 'auto',
    height: 150,
    marginHorizontal: 21,
    marginVertical: 15,
  },

  scrollView_container: {},
});

export default RestaurantMenuScreen;
