import { Text, View, Image } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import Style from '~/styles/OnBoardingStyle';

import UtilityCard from '~/components/onBoarding/UtilityCard';
import Indicator from '~/components/onBoarding/Indicator';
import SubmitButton from '~/components/SubmitButton';
import SkipButton from '~/components/onBoarding/SkipButton';

export default function OnBoardingScreen1({ navigation }) {
  const onSkipPressHandler = () => {
    navigation.navigate('Authenticate');
  };

  const onNextPressHandler = () => {
    navigation.navigate('OnBoardingScreen_2');
  };

  return (
    <View style={Style.container}>
      <Image style={Style.image} source={require('~/resources/images/onboarding-1.jpg')} />
      <Indicator styleFirstPage={{ backgroundColor: COLOR.indicator_current_color }} />
      <UtilityCard
        title="Wide range of Food Categories & more"
        content="Browse through our extensive list of restaurants and dishes, and when you're ready to order, simply add your desired items to your cart and checkout. It's that easy!"
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
