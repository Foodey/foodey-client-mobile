import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList } from 'react-native';
import React, { useState, useContext } from 'react';
import { COLOR } from '~/constants/Colors';
import { SearchBar, BackButton, RestaurantBar } from '~/components';
import { Filter } from '~/resources/icons';
import Style from './HomeStyle';
import { restaurants } from '~/constants/TempData';
import { HomeContext } from '~/contexts/HomeContext';

const CategoryDetailScreen = ({ navigation, route }) => {
  const { setCategorySearchValue } = useContext(HomeContext);

  const { category } = route.params;

  const onBackHandler = () => {
    setCategorySearchValue('');
    navigation.goBack();
  };

  const [restaurantsList, setRestaurantsList] = useState(restaurants);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton
        style={[Style.header, { marginBottom: 15, marginTop: 5 }]}
        onPressFunction={onBackHandler}
      />
      <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
        <Text style={Style.screen_title_text}>{category}</Text>
        {/* <Pressable style={styles.filter_button}>
          <Filter />
          <Text style={styles.filter_button_text}>Filter</Text>
        </Pressable> */}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 15,
          paddingBottom: 125,
        }}
        data={restaurantsList}
        renderItem={({ item }) => (
          <RestaurantBar
            // style={{ margin: 25 }}
            logoLink={item.logoLink}
            name={item.name}
            distance={1.2} // this distance should be calculated depends on the current location of user
            estimateTime={32} // this estimateTime should be calculated depends on the current location of user
            avgReview={item.avgReview}
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

export default CategoryDetailScreen;
