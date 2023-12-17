import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { LocationDisplay, CircleCategory } from '~/components/home';
import { SearchBar, BackButton } from '~/components';
import { Filter } from '~/resources/icons';
import { categories } from '~/constants/TempData';
import Style from './HomeStyle';

const SearchScreen = ({ navigation }) => {
  const onBackHandler = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton style={[Style.header, { marginBottom: 0 }]} onPressFunction={onBackHandler} />
      <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
        <Text style={Style.screen_title_text}>All Categories</Text>
      </View>
      <SearchBar style={Style.search_bar} placeholder="Search by Category" />
      <FlatList
        contentContainerStyle={{ marginHorizontal: 21, alignItems: 'center', height: '100%' }}
        numColumns={3}
        data={categories}
        renderItem={({ item }) => (
          <CircleCategory style={{ margin: 10 }} imageLink={item.imageLink} title={item.name} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
  },

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
