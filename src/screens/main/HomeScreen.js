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
      <ScrollView
        style={styles.scrollView_container}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
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
  },

  scrollView_container: {},
});

export default HomeScreen;
