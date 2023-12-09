import { Text, View, Image, SafeAreaView, StatusBar } from 'react-native';
import { useState } from 'react';
import { COLOR } from '~/constants/Colors';
import Style from './OnBoardingStyle';
import { UtilityCard, SubmitButton } from '~/components';
import { Indicator, SkipButton } from '~/components/onBoarding';

export default function OnBoardingScreen1({ navigation }) {
  const onSkipPressHandler = () => {
    navigation.navigate('Authenticate');
  };

  const onNextPressHandler = () => {
    navigation.navigate('OnBoardingScreen_2');
  };

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <Image style={Style.image} source={require('~/resources/images/onboarding-1.jpg')} />
      <Indicator styleFirstPage={{ backgroundColor: COLOR.indicator_current_color }} />
      <UtilityCard
        style={Style.info_container}
        title="Wide range of Food Categories & more"
        content="Browse through our extensive list of restaurants and dishes, and when you're ready to order, simply add your desired items to your cart and checkout. It's that easy!"
      />
      <View style={Style.footer_view}>
        <SkipButton style={Style.skip_button} onPressFunction={onSkipPressHandler} />
        <SubmitButton
          showIcon={true}
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
