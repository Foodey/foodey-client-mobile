import { View, Text, SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import { LocationDisplay } from '~/components/home';
import { SearchBar } from '~/components';

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
            Trí
          </Text>
        </View>
        <View style={{ width: '100%', height: 320, marginHorizontal: 21 }}>
          <Text style={styles.section_title_text}>Categories</Text>
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
    fontSize: 34,
    color: COLOR.text_primary_color,
    marginBottom: 24,
  },

  section_title_text: {
    fontFamily: 'Manrope-Regular',
    fontWeight: '500',
    fontSize: 21,
    color: COLOR.text_primary_color,
  },
});

export default HomeScreen;
