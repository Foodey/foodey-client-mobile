import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { AddressCard } from '../../components';

const AddressScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLOR.background_color} />
      <AddressCard
        title="Delivery Address"
        name="Le Doan Tan Tri"
        phoneNumber="0949336597"
        address="123 ABC Street, Ward 2, District 7, Ho Chi Minh City, Vietnam "
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AddressScreen;
