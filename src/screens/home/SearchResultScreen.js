import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { SearchBar, BackButton, RestaurantBar } from '~/components';
import Style from './HomeStyle';
import { SearchScreen } from '~/screens/home';
import DropDownPicker from 'react-native-dropdown-picker';
import { restaurants } from '~/constants/TempData';
import { useContext, useLayoutEffect } from 'react';
import { HomeContext } from '~/contexts/HomeContext';
import { searchResByNameAPI } from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import { AppContext } from '../../contexts/AppContext';

const SearchResultScreen = ({ navigation }) => {
  const { setSearchValue, searchResultSelected, setSearchResultSelected } = useContext(HomeContext);

  const { favoriteRestaurants } = useContext(AppContext);

  const onBackHandler = () => {
    setSearchValue('');
    setSearchResultSelected('');
    navigation.goBack();
  };

  const onResPressFunction = (item) => {
    const isUserFavorite = favoriteRestaurants.some((restaurant) => restaurant.id === item.id);
    navigation.navigate('RestaurantMenu_Screen', {
      brandID: item.brandId,
      restaurantID: item.id, //try replace the restaurantsByCategoryList with passing the item as the param of the callback function
      restaurantName: item.name,
      restaurantLogo: item.logo,
      restaurantWallpaper: item.wallpaper,
      restaurantAddress: item.address,
      isUserFavorite: isUserFavorite,
    });
  };

  useLayoutEffect(() => {
    const fetchSearchResult = async (selectedValue) => {
      try {
        const response = await searchResByNameAPI(selectedValue);
        if (response.status === HTTPStatus.OK) {
          setSearchResult(response.data?.content);
        } else {
          console.log('Error when fetching search result');
        }
      } catch (err) {
        console.log('Error when fetching search result ' + err);
      }
    };

    fetchSearchResult(searchResultSelected);
  }, []);

  const [searchVisible, setSearchVisible] = useState(false);

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [chosenValue, setChosenValue] = useState(null);
  const [filterOptions, setFilterOptions] = useState([
    {
      label: 'Relevance',
      value: 'Relevance',
    },
    {
      label: 'Nearby',
      value: 'Nearby',
    },
    {
      label: 'Rating',
      value: 'Rating',
    },
  ]);

  const [searchResult, setSearchResult] = useState({});

  const seeSearchResultHandler = () => {
    setSearchVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <SearchScreen
        visible={searchVisible}
        onClosePress={() => setSearchVisible(false)}
        onSelectedItem={seeSearchResultHandler}
        onSubmitEditing={() => setSearchVisible(false)}
      />
      <BackButton
        style={[Style.header, { marginBottom: 15, marginTop: 5 }]}
        onPressFunction={onBackHandler}
      />
      <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={Style.screen_title_text}>
          {searchResultSelected}
        </Text>
        {/* <Pressable style={styles.filter_button}>
          <Filter />
          <Text style={styles.filter_button_text}>Filter</Text>
        </Pressable> */}
      </View>
      <SearchBar
        style={Style.search_bar}
        placeholder="Search Foods, Restaurants etc."
        editable={false}
        onPressFunction={() => setSearchVisible(true)}
        onDeletePress={() => setSearchValue('')}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 21,
          width: 130,
          height: 30,
          marginTop: 15,
          marginBottom: 25,
        }}
      >
        <DropDownPicker
          open={dropDownOpen}
          value={chosenValue}
          items={filterOptions}
          setOpen={() => setDropDownOpen(!dropDownOpen)}
          setValue={(value) => setChosenValue(value)}
          setItems={setFilterOptions}
          style={{ borderWidth: 0, backgroundColor: COLOR.input_background_color, zIndex: 1 }}
          labelStyle={{ fontFamily: 'Manrope-Medium', fontSize: 16 }}
          placeholder="Sort by"
          placeholderStyle={{ fontFamily: 'Manrope-Medium', fontSize: 16 }}
          dropDownContainerStyle={{
            backgroundColor: COLOR.input_background_color,
            borderWidth: 0,
            position: 'absolute',
            zIndex: 1,
          }}
          listItemLabelStyle={{ fontFamily: 'Manrope-Medium', fontSize: 16 }}
          itemSeparatorStyle={{ color: '#000' }}
          showTickIcon={false}
          dropDownDirection="TOP"
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          marginTop: 15,
          paddingBottom: 260,
        }}
        data={searchResult}
        renderItem={({ item }) => (
          <RestaurantBar
            // style={{ margin: 25 }}
            onPressFunction={() => onResPressFunction(item)}
            image={item.logo}
            name={item.name}
            distance={1.2} // this distance should be calculated depends on the current location of user
            estimateTime={32} // this estimateTime should be calculated depends on the current location of user
            rating={item.rating}
          />
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

export default SearchResultScreen;
