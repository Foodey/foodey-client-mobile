import { View, Text, Pressable, StyleSheet, Image, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';

const AddEditProductScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <Text>AddEditProductScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddEditProductScreen;
