import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { LocationDisplay, CircleCategory, RestaurantScrollCard } from '~/components/home';
import { SearchBar } from '~/components';
import { FullArrowRight } from '~/resources/icons';
import { categories, restaurants } from '~/constants/TempData';
import Style from './HomeStyle';
import ArrowRight from '~/resources/icons/arrow-right';

const HomeScreen = () => {
  return (
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <LocationDisplay style={Style.header} location="69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương" />
      <SearchBar style={Style.search_bar} placeholder="Search Foods, Restaurants etc." />
      <ScrollView style={styles.scrollView_container} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
          <Text style={Style.screen_title_text}>Good evening, </Text>
          <Text
            style={[
              Style.screen_title_text,
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
              <CircleCategory imageLink={categories[0].imageLink} title={categories[0].name} />
              <CircleCategory imageLink={categories[1].imageLink} title={categories[1].name} />
              <CircleCategory imageLink={categories[2].imageLink} title={categories[2].name} />
            </View>
            <View style={styles.categories_row_container}>
              <CircleCategory imageLink={categories[3].imageLink} title={categories[3].name} />
              <CircleCategory imageLink={categories[4].imageLink} title={categories[4].name} />
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
                    fontFamily: 'Manrope-Medium',
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
        <View style={styles.offerNearby_container}>
          <View style={styles.offerNearby_header_container}>
            <Text style={styles.section_title_text}>Offers Near you</Text>
            <Pressable style={{ marginLeft: 'auto', flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: 'Manrope-Medium',
                  fontSize: 15,
                  color: COLOR.text_secondary_color,
                }}
              >
                See all
              </Text>
              <FullArrowRight
                width={24}
                height={24}
                style={{ color: COLOR.text_secondary_color, marginStart: 5 }}
              />
            </Pressable>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 15 }}
            data={restaurants}
            renderItem={({ item }) => (
              <RestaurantScrollCard
                style={{ marginStart: 21 }}
                wallpaperLink={item.wallpaperLink}
                logoLink={item.logoLink}
                name={item.name}
                distance={1.2} // this distance should be calculated depends on the current location of user
              />
            )}
            ListFooterComponent={() => (
              <View style={styles.list_footer_container}>
                <Pressable style={styles.seeAll_round_button}>
                  <ArrowRight width={18} height={18} style={{ color: COLOR.background_color }} />
                </Pressable>
                <Text
                  style={{
                    fontFamily: 'Manrope-Medium',
                    fontSize: 15,
                    color: COLOR.text_secondary_color,
                  }}
                >
                  See All
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.new_trending_container}>
          <View style={styles.offerNearby_header_container}>
            <Text style={styles.section_title_text}>New & Trending</Text>
            <Pressable style={{ marginLeft: 'auto', flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: 'Manrope-Medium',
                  fontSize: 15,
                  color: COLOR.text_secondary_color,
                }}
              >
                See all
              </Text>
              <FullArrowRight
                width={24}
                height={24}
                style={{ color: COLOR.text_secondary_color, marginStart: 5 }}
              />
            </Pressable>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 15 }}
            data={restaurants}
            renderItem={({ item }) => (
              <RestaurantScrollCard
                style={{ marginStart: 21 }}
                wallpaperLink={item.wallpaperLink}
                logoLink={item.logoLink}
                name={item.name}
                distance={1.2} // this distance should be calculated depends on the current location of user
              />
            )}
            ListFooterComponent={() => (
              <View style={styles.list_footer_container}>
                <Pressable style={styles.seeAll_round_button}>
                  <ArrowRight width={18} height={18} style={{ color: COLOR.background_color }} />
                </Pressable>
                <Text
                  style={{
                    fontFamily: 'Manrope-Medium',
                    fontSize: 15,
                    color: COLOR.text_secondary_color,
                  }}
                >
                  See All
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView_container: {},

  section_title_text: {
    fontFamily: 'Manrope-Medium',
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

  offerNearby_container: {
    width: '100%',
    height: 230,
    borderTopWidth: 1,
    borderTopColor: COLOR.indicator_color,
    marginTop: 15,
  },

  offerNearby_header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 21,
  },

  new_trending_container: {
    width: '100%',
    height: 280,
    marginTop: 15,
  },

  list_footer_container: {
    width: 100,
    height: 111,
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeAll_round_button: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: COLOR.text_secondary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
