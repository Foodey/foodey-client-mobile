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
import React, { useState, useContext } from 'react';
import { COLOR } from '~/constants/Colors';
import { LocationDisplay, CircleCategory } from '~/components/home';
import { SearchBar, BackButton } from '~/components';
import { Filter } from '~/resources/icons';
import Style from './HomeStyle';
import { HomeContext } from '~/contexts/HomeContext';

const CategoriesScreen = ({ navigation }) => {
  const { categorySearchValue, setCategorySearchValue, categoriesList, setCategoriesList } =
    useContext(HomeContext);

  const onBackHandler = () => {
    Keyboard.dismiss();
    setCategorySearchValue('');
    navigation.goBack();
  };

  const onSubmitEditingHandler = () => {
    if (categorySearchValue === '') Keyboard.dismiss();
    else {
      setCategorySearchValue(categorySearchValue);
      navigation.navigate('CategoryDetail_Screen', {
        categoryID: categoriesList[0].id,
        category: categoriesList[0].name,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <BackButton style={[Style.header, { marginBottom: 0 }]} onPressFunction={onBackHandler} />
      <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
        <Text style={Style.screen_title_text}>All Categories</Text>
      </View>
      <SearchBar
        style={[Style.search_bar, { marginTop: 20 }]}
        placeholder="Search by Category"
        searchValue={categorySearchValue}
        onChangeText={(text) => setCategorySearchValue(text)}
        onDeletePress={() => setCategorySearchValue('')}
        onSubmitEditing={onSubmitEditingHandler}
      />
      <FlatList
        contentContainerStyle={{
          marginHorizontal: 21,
          alignItems: 'center',
          marginTop: 30,
          paddingBottom: 220,
        }}
        numColumns={3}
        data={categoriesList}
        renderItem={({ item }) => (
          <CircleCategory
            style={{ margin: 10 }}
            imageStyle={{ width: 50, height: 50 }}
            imageLink={item.image}
            title={item.name}
            onPressFunction={() => {
              navigation.navigate('CategoryDetail_Screen', {
                categoryID: item?.id,
                category: item?.name,
              });
            }}
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
});

export default CategoriesScreen;
