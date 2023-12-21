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
import { RestaurantTitle } from '~/components/discover';

const RestaurantMenuScreen = ({ navigation }) => {
  //Navigation:

  //Use states

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
        <RestaurantTitle style={{ margin: 21 }} />
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

  scrollView_container: {},
});

export default RestaurantMenuScreen;
