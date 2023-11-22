import { View, Image } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import Style from '~/styles/OnBoardingStyle';

import UtilityCard from '~/components/onBoarding/UtilityCard';
import Indicator from '~/components/onBoarding/Indicator';
import SubmitButton from '~/components/SubmitButton';

export default function OnBoardingScreen3({ navigation }) {
  const onStartPressHandler = () => {
    navigation.navigate('Authenticate');
  };

  return (
    <View style={Style.container}>
      <Image style={Style.image} source={require('~/resources/images/intro-picture-3.jpg')} />
      <Indicator styleThirdPage={{ backgroundColor: COLOR.indicator_current_color }} />
      <UtilityCard
        title="Get started on Ordering your Food"
        content="Please create an account or sign in to your existing account to start browsing our selection of delicious meals from your favorite restaurants."
      />
      <View style={Style.footer_view}>
        <SubmitButton
          title="Start"
          style={Style.next_pressable}
          onPressFunction={onStartPressHandler}
        />
      </View>
    </View>
  );
}
