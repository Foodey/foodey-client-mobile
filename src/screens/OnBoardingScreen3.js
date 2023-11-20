import { View, Image } from 'react-native';
import { useState } from 'react';
import { COLOR } from '../constants/Colors';
import Style from '../styles/OnBoardingStyle';

import UtilityCard from '../components/onBoarding/UtilityCard';
import Indicator from '../components/onBoarding/Indicator';
import SubmitButton from '../components/SubmitButton';
import SkipButton from '../components/onBoarding/SkipButton';

export default function OnBoardingScreen3() {
  return (
    <View style={Style.container}>
      <Image style={Style.image} source={require('../../resources/images/intro-picture-3.jpg')} />
      <Indicator />
      <UtilityCard
        title="Get started on Ordering your Food"
        content="Please create an account or sign in to your existing account to start browsing our selection of delicious meals from your favorite restaurants."
      />
      <View style={Style.footer_view}>
        <SkipButton style={Style.skip_pressable} />
        <SubmitButton title="Start" style={Style.next_pressable} />
      </View>
    </View>
  );
}
