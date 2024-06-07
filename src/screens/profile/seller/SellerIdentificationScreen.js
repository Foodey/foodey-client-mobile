import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';

const SellerIdentificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <Text>SellerIdentificationScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },
});

export default SellerIdentificationScreen;
