import { View, Text, StatusBar, StyleSheet, Pressable, FlatList, Modal } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { COLOR } from '~/constants/Colors';
import { BackButton } from '~/components';
import SearchBar from '../../components/SearchBar';
import Style from './HomeStyle';
import { HomeContext } from '~/contexts/HomeContext';
import { searchResByNameAPI } from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import { useDebounce } from '../../utils/hooks';
import { AppContext } from '../../contexts/AppContext';
import MyAsyncStorage from '../../utils/MyAsyncStorage';
import StorageKey from '../../constants/StorageKey';

const SearchScreen = ({ visible, onClosePress, onSelectedItem, onSubmitEditing }) => {
  const {
    searchValue,
    setSearchValue,
    setSearchResultSelected,
    searchSuggestion,
    setSearchSuggestion,
  } = useContext(HomeContext);

  const { searchHistory, setSearchHistory } = useContext(AppContext);

  // console.log('search screen')
  const debounceSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const searchResByName = async () => {
      // console.log(debounceSearchValue);
      try {
        const response = await searchResByNameAPI(debounceSearchValue, 0, 10);
        if (response.status === HTTPStatus.OK) {
          const suggestionName = response.data?.content?.map((res) => res.name);
          // console.log(suggestionName);
          setSearchSuggestion(suggestionName);
        } else {
          console.log('Error when searching restaurant by name');
        }
      } catch (err) {
        console.log('Error when searching restaurant by name ' + err);
      }
    };

    searchResByName();
  }, [debounceSearchValue]);

  const onBackPress = () => {
    setSearchValue('');
    onClosePress();
  };

  const onClearAllPress = async () => {
    await MyAsyncStorage.removeItem(StorageKey.SEARCH_HISTORY);
    setSearchHistory([]);
  };

  return (
    <Modal style={styles.container} visible={visible} transition="fade">
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton
        style={[{ marginBottom: 15, marginTop: 5, marginStart: 21 }]}
        onPressFunction={onBackPress}
      />
      <SearchBar
        style={Style.search_bar}
        placeholder="Search Foods, Restaurants etc."
        searchValue={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        onDeletePress={() => setSearchValue('')}
        onSubmitEditing={async () => {
          setSearchResultSelected(searchValue);
          setSearchHistory([...searchHistory, searchValue]);
          let tempArray = searchHistory;
          tempArray.push(searchValue);
          console.log(tempArray);
          await MyAsyncStorage.setItem(StorageKey.SEARCH_HISTORY, JSON.stringify(tempArray));
          onSubmitEditing();
        }}
      />
      {!searchValue && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 21 }}>
          <Text
            style={[
              Style.screen_title_text,
              { fontSize: 23, marginBottom: 0, color: COLOR.text_blue_color },
            ]}
          >
            Recently Searched
          </Text>
          <Pressable style={{ marginLeft: 'auto' }} onPress={() => onClearAllPress()}>
            <Text style={styles.clear_all_text}>CLEAR ALL</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        data={searchValue === '' ? searchHistory : searchSuggestion}
        renderItem={({ item }) => (
          <Pressable
            style={styles.search_history_button}
            onPress={async () => {
              setSearchResultSelected(item);
              setSearchHistory([...searchHistory, item]);
              let tempArray = searchHistory;
              tempArray.push(item);
              console.log(tempArray);
              await MyAsyncStorage.setItem(StorageKey.SEARCH_HISTORY, JSON.stringify(tempArray));
              onSelectedItem();
            }}
          >
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
