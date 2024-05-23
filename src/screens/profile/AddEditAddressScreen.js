import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';

const AddEditAddressScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLOR.background_color} />
      <Text>AddEditAddressScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AddEditAddressScreen;
