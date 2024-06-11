import { View, Text, Pressable, StyleSheet, Image, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';

const SellerRestaurantMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.button_primary_color} />
      <Text>SellerRestaurantMenuScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SellerRestaurantMenuScreen;
