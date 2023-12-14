import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { LocationDisplay, CircleCategory } from '~/components/home';
import { SearchBar, BackButton } from '~/components';
import { Filter } from '~/resources/icons';
import { categories } from '~/constants/TempData';
import Style from './HomeStyle';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton style={[Style.header, { marginBottom: 0 }]} />
      <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
        <Text style={Style.screen_title_text}>Search</Text>
        <Pressable style={styles.filter_button}>
          <Filter />
          <Text style={styles.filter_button_text}>Filter</Text>
        </Pressable>
      </View>
      <SearchBar style={Style.search_bar} placeholder="Search Foods, Restaurants etc." />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 21 }}>
        <Text style={[Style.screen_title_text, { fontSize: 23, marginBottom: 0 }]}>
          Recently Searched
        </Text>
        <Pressable style={{ marginLeft: 'auto' }}>
          <Text style={styles.clear_all_text}>CLEAR ALL</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filter_button: {
    flexDirection: 'row',
    width: 100,
    height: 45,
    backgroundColor: COLOR.circleCategory_background_color,
    borderRadius: 15,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },

  filter_button_text: {
    fontFamily: 'Manrope-Regular',
    color: COLOR.button_secondary_color,
    fontSize: 18,
    marginStart: 6,
  },

  clear_all_text: {
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_errorMessage_color,
    margin: 10,
    fontSize: 14,
  },
});

export default SearchScreen;
