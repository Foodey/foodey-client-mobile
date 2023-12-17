import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { SearchBar, BackButton } from '~/components';
import { Filter } from '~/resources/icons';
import Style from './HomeStyle';
import { searchHistory } from '~/constants/TempData';

const SearchScreen = ({ visible, onClosePress }) => {
  return (
    <Modal style={styles.container} visible={visible} transition="fade">
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton
        style={[Style.header, { marginBottom: 15, marginTop: 5 }]}
        onPressFunction={onClosePress}
      />
      <SearchBar style={Style.search_bar} placeholder="Search Foods, Restaurants etc." />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 21 }}>
        <Text
          style={[
            Style.screen_title_text,
            { fontSize: 23, marginBottom: 0, color: COLOR.text_blue_color },
          ]}
        >
          Recently Searched
        </Text>
        <Pressable style={{ marginLeft: 'auto' }}>
          <Text style={styles.clear_all_text}>CLEAR ALL</Text>
        </Pressable>
      </View>
      <FlatList
        data={searchHistory}
        renderItem={({ item }) => (
          <Pressable style={styles.search_history_button}>
            <Text style={styles.search_history_text}>{item}</Text>
          </Pressable>
        )}
      />
    </Modal>
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

  search_history_button: {
    height: 55,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLOR.indicator_color,
  },

  search_history_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    color: COLOR.text_primary_color,
    marginStart: 21,
  },
});

export default SearchScreen;
