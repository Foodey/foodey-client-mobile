import { View, Image } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import Style from './OnBoardingStyle';

import { UtilityCard, SubmitButton } from '~/components';
import { Indicator } from '~/components/onBoarding';

export default function OnBoardingScreen3({ navigation }) {
  const onStartPressHandler = () => {
    navigation.navigate('Authenticate');
  };

  return (
    <View style={Style.container}>
      <Image style={Style.image} source={require('~/resources/images/onboarding-3.webp')} />
      <Indicator styleThirdPage={{ backgroundColor: COLOR.indicator_current_color }} />
      <UtilityCard
        style={Style.info_container}
        title="Get started on Ordering your Food"
        content="Please create an account or sign in to your existing account to start browsing our selection of delicious meals from your favorite restaurants."
      />
      <View style={Style.footer_view}>
        <SubmitButton
          title="Start"
          onPressFunction={onStartPressHandler}
          style={{ flex: 1, marginVertical: 49 }}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_hover_primary_color}
        />
      </View>
    </View>
  );
}
