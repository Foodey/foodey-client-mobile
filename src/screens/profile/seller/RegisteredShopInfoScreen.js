import { View, Text, SafeAreaView, StyleSheet, StatusBar, TextInput } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, PressableInputField, ShortInputField } from '../../../components/seller';
import { SubmitButton } from '../../../components';
import StepIndicator from 'react-native-step-indicator';

const RegisteredShopInfoScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    // console.log('Back press');
    navigation.pop();
  };

  const onNextPress = () => {
    //verify inputs logic
    navigation.navigate('SellerIdentification_Screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title="Shop Information"
      />
      <View style={{ backgroundColor: COLOR.background_color }}>
        <StepIndicator
          stepCount={2}
          labels={['Shop Information', 'Seller Identification']}
          customStyles={styles.step_indicator}
          currentPosition={0}
        />
      </View>
      <View style={{ flex: 1 }}>
        {/*content container */}
        <View style={{ flex: 9, marginTop: 10 }}>
          <ShortInputField title="Shop Name" placeholder="Enter Shop Name" isRequired={true} />
          <ShortInputField
            title="Phone Number"
            placeholder="Enter Phone Number"
            isRequired={true}
          />
          <PressableInputField isRequired={true} title="Pickup Address" value="" />
        </View>
        {/*footer container */}
        <View
          style={{
            flex: 1,
            paddingVertical: 21,
            paddingHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: COLOR.background_color,
          }}
        >
          <SubmitButton
            disabled={true}
            style={{ flex: 1 }}
            title={'Back'}
            buttonColor={COLOR.button_red_color}
            hoverColor={COLOR.button_press_red_color}
            // onPressFunction={() => navigation.navigate('RegisteredShopInfo_Screen')}
          />
          <SubmitButton
            style={{ flex: 1, marginStart: 10 }}
            title={'Next'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={onNextPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer_container: {
    flex: 1,
  },

  step_indicator: {
    //separator
    separatorFinishedColor: COLOR.text_blue_color,
    separatorUnFinishedColor: COLOR.text_press_color,
    //Step
    stepStrokeCurrentColor: COLOR.text_blue_color,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLOR.text_blue_color,
    stepStrokeUnFinishedColor: COLOR.text_press_color,
    stepIndicatorFinishedColor: COLOR.text_blue_color,
    stepIndicatorUnFinishedColor: COLOR.background_color,
    stepIndicatorCurrentColor: COLOR.background_color,
    //label
    stepIndicatorLabelCurrentColor: COLOR.text_blue_color,
    stepIndicatorLabelFinishedColor: COLOR.background_color,
    stepIndicatorLabelUnFinishedColor: COLOR.text_press_color,

    labelSize: 14,
    labelFontFamily: 'Manrope-Medium',
    currentStepLabelColor: COLOR.text_primary_color,
    labelColor: COLOR.text_primary_color,
  },
});

export default RegisteredShopInfoScreen;
