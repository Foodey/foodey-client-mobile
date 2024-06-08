import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader } from '../../../components/seller';
import { SubmitButton } from '../../../components';

const RequestSentNotiScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    console.log('Back press');
    navigation.pop();
  };

  const onConfirmPress = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader onLeftButtonPress={onGoBackPress} title="Successfully Sent!" />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, padding: 21 }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('../../../resources/images/Foodey-LOGO.png')}
          />
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.text}>
            Your request to become a Seller on Foodey has been sent successfully!. On the next few
            days, please tracking your phone number for the result to become our Foodey's partner!
          </Text>
        </View>
        <SubmitButton
          style={{ flex: 1, margin: 21 }}
          title={'Got it!'}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={onConfirmPress}
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

export default RequestSentNotiScreen;
