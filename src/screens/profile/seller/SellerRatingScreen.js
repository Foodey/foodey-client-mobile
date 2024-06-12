import { View, Text, Pressable, StyleSheet, Image, StatusBar } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { StarRating } from '../../../components';

const SellerRatingScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Ratings" onLeftButtonPress={onBackPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SellerRatingScreen;
