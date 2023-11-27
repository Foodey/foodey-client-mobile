import { Text, View, Image, SafeAreaView, StatusBar } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import Style from './OnBoardingStyle';

import { UtilityCard, SubmitButton } from '~/components';
import { Indicator, SkipButton } from '~/components/onBoarding';

export default function OnBoardingScreen2({ navigation }) {
  const onSkipPressHandler = () => {
    navigation.navigate('Authenticate');
  };

  const onNextPressHandler = () => {
    navigation.navigate('OnBoardingScreen_3');
  };

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <Image style={Style.image} source={require('~/resources/images/onboarding-2.webp')} />
      <Indicator styleSecondPage={{ backgroundColor: COLOR.indicator_current_color }} />
      <UtilityCard
        style={Style.info_container}
        title="Wherever you eat with Fast Deliveries"
        content="Get your favorite meals delivered to your doorstep as soon as possible!"
      />
      <View style={Style.footer_view}>
        <SkipButton style={Style.skip_button} onPressFunction={onSkipPressHandler} />
        <SubmitButton
          title="Next"
          onPressFunction={onNextPressHandler}
          style={Style.next_button}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
        />
      </View>
    </SafeAreaView>
  );
}
