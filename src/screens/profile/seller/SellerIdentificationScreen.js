import { View, Text, SafeAreaView, StyleSheet, StatusBar, TextInput } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, PressableInputField, ShortInputField } from '../../../components/seller';
import { SubmitButton } from '../../../components';
import StepIndicator from 'react-native-step-indicator';

const SellerIdentificationScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    console.log('Back press');
    navigation.pop();
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
          currentPosition={1}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 9, marginTop: 10 }}>
          <ShortInputField
            title="Citizen identification number"
            placeholder="Enter"
            isRequired={true}
          />
          <ShortInputField title="Full Name" placeholder="Enter" isRequired={true} />
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 21,
            marginHorizontal: 10,
            flexDirection: 'row',
            paddingVertical: 10,
          }}
        >
          <SubmitButton
            style={{ flex: 1 }}
            title={'Back'}
            buttonColor={COLOR.button_red_color}
            hoverColor={COLOR.button_press_red_color}
            onPressFunction={() => navigation.goBack()}
          />
          <SubmitButton
            style={{ flex: 1, marginStart: 10 }}
            title={'Next'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={() => navigation.navigate('SellerIdentification_Screen')}
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
    separatorFinishedColor: COLOR.indicator_current_color,
    separatorUnFinishedColor: COLOR.text_press_color,
    //Step
    stepStrokeCurrentColor: COLOR.indicator_current_color,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLOR.indicator_current_color,
    stepStrokeUnFinishedColor: COLOR.text_press_color,
    stepIndicatorFinishedColor: COLOR.indicator_current_color,
    stepIndicatorUnFinishedColor: COLOR.background_color,
    stepIndicatorCurrentColor: COLOR.background_color,
    //label
    stepIndicatorLabelCurrentColor: COLOR.indicator_current_color,
    stepIndicatorLabelFinishedColor: COLOR.background_color,
    stepIndicatorLabelUnFinishedColor: COLOR.text_press_color,

    labelSize: 14,
    labelFontFamily: 'Manrope-Medium',
    currentStepLabelColor: COLOR.indicator_current_color,
    labelColor: COLOR.text_primary_color,
  },
});

export default SellerIdentificationScreen;
