import { Text, View, Image } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import Style from '~/styles/OnBoardingStyle';

import UtilityCard from '~/components/UtilityCard';
import Indicator from '~/components/onBoarding/Indicator';
import SubmitButton from '~/components/SubmitButton';
import SkipButton from '~/components/onBoarding/SkipButton';

export default function OnBoardingScreen2({ navigation }) {
  const onSkipPressHandler = () => {
    navigation.navigate('Authenticate');
  };

  const onNextPressHandler = () => {
    navigation.navigate('OnBoardingScreen_3');
  };

  return (
    <View style={Style.container}>
      <Image style={Style.image} source={require('~/resources/images/onboarding-2.webp')} />
      <Indicator styleSecondPage={{ backgroundColor: COLOR.indicator_current_color }} />
      <UtilityCard
        style={Style.info_container}
        title="Wherever you eat with Fast Deliveries"
        content="Get your favorite meals delivered to your doorstep as soon as possible!"
      />
      <View style={Style.footer_view}>
        <SkipButton style={Style.skip_pressable} onPressFunction={onSkipPressHandler} />
        <SubmitButton
          title="Next"
          style={Style.next_pressable}
          onPressFunction={onNextPressHandler}
        />
      </View>
    </View>
  );
}
