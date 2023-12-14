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
import { SearchBar } from '~/components';
import { FullArrowRight } from '~/resources/icons';
import { categories } from '~/constants/TempData';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <LocationDisplay style={styles.header} location="69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương" />
      <SearchBar style={styles.search_bar} placeholder="Search Foods, Restaurants etc." />
      <ScrollView style={styles.scrollView_container} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
          <Text style={styles.greeting_text}>Good evening, </Text>
          <Text
            style={[
              styles.greeting_text,
              { color: COLOR.button_primary_color, fontFamily: 'Manrope-Bold' },
            ]}
          >
            Thịnh
          </Text>
        </View>
        <View style={{ width: '90%', height: 290, marginHorizontal: 21 }}>
          <Text style={styles.section_title_text}>Categories</Text>
          <View style={styles.categories_container}>
            <View style={styles.categories_row_container}>
              <CircleCategory
                imageStyle={{ marginStart: 5 }}
                imageLink={categories[0].imageLink}
                title={categories[0].name}
              />
              <CircleCategory
                imageStyle={{ width: 60, height: 60 }}
                imageLink={categories[1].imageLink}
                title={categories[1].name}
              />
              <CircleCategory
                imageStyle={{ width: 55, height: 55 }}
                imageLink={categories[2].imageLink}
                title={categories[2].name}
              />
            </View>
            <View style={styles.categories_row_container}>
              <CircleCategory imageLink={categories[3].imageLink} title={categories[3].name} />
              <CircleCategory
                imageStyle={{ marginStart: 20 }}
                imageLink={categories[4].imageLink}
                title={categories[4].name}
              />
              <Pressable
                style={({ pressed }) => [
                  {
                    width: 112,
                    height: 112,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: COLOR.button_primary_color,
                    backgroundColor: pressed
                      ? COLOR.input_background_color
                      : COLOR.background_color,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <FullArrowRight
                  width={24}
                  height={24}
                  style={{ color: COLOR.button_primary_color }}
                />
                <Text
                  style={{
                    fontFamily: 'Manrope-Regular',
                    fontWeight: '500',
                    fontSize: 16.5,
                    color: COLOR.button_primary_color,
                  }}
                >
                  See alls
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', height: 305 }}></View>
        <View style={{ width: '100%', height: 305 }}></View>
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
    height: 47,
    marginHorizontal: 21,
    marginVertical: 15,
  },

  search_bar: {
    height: 50,
    marginHorizontal: 21,
    marginBottom: 15,
  },

  scrollView_container: {},

  greeting_text: {
    fontFamily: 'Manrope-Regular',
    fontWeight: '400',
    fontSize: 33,
    color: COLOR.text_primary_color,
    marginBottom: 24,
  },

  section_title_text: {
    fontFamily: 'Manrope-Regular',
    fontWeight: '500',
    fontSize: 21,
    color: COLOR.text_primary_color,
  },

  categories_container: {
    flex: 1,
    marginTop: 15,
  },

  categories_row_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
