import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { SubmitButton } from '../../../components';

const SellerIntroScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    console.log('Back press');
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader onLeftButtonPress={onGoBackPress} title="Welcome to Foodey!" />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, padding: 21 }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('../../../resources/images/Foodey-LOGO.png')}
          />
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.text}>
            Please provide information to upgrade to Seller role in Foodey
          </Text>
        </View>
        <SubmitButton
          style={{ flex: 1, margin: 21 }}
          title={'Start Registered Shop'}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={() => navigation.navigate('RegisteredShopInfo_Screen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  footer_container: {
    flex: 1,
    margin: 21,
  },

  text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 18,
    color: COLOR.text_primary_color,
    textAlign: 'center',
    marginHorizontal: 41,
    marginTop: 21,
  },
});

export default SellerIntroScreen;
