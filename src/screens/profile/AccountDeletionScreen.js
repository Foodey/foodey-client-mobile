import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR } from '../../constants/Colors';
import { ProfileScreenHeader } from '../../components/profile';

const AccountDeletionScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader title="Account Deletion" onBackPressFunction={onBackPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },
});

export default AccountDeletionScreen;
