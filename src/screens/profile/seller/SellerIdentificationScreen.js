import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import {
  IntroHeader,
  PressableInputField,
  ShortInputField,
  ImageInput,
} from '../../../components/seller';
import { SubmitButton } from '../../../components';
import StepIndicator from 'react-native-step-indicator';

const SellerIdentificationScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    // console.log('Back press');
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
        {/*content container */}
        <ScrollView style={{ height: '75%', marginTop: 10 }}>
          <ShortInputField
            title="Citizen identification number"
            placeholder="Enter"
            isRequired={true}
          />
          <ShortInputField title="Full Name" placeholder="Enter" isRequired={true} />
          <Text style={styles.instruction_text}>Citizen Identification Card Photos</Text>
          <ImageInput
            style={{}}
            title="Photo of the front of your Citizen Identification card"
            isRequired={true}
            imageURI=""
          />
          <Text style={styles.instruction_text}>
            Please provide close-up photo of the front of your Citizen Identification card. The
            information in the front of the Citizen Identification card must be clearly shown.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of the back of your Citizen Identification card"
            isRequired={true}
            imageURI=""
          />
          <Text style={styles.instruction_text}>
            Please provide close-up photo of the back of your Citizen Identification card. The
            information in the back of the Citizen Identification card must be clearly shown.
          </Text>
        </ScrollView>
        {/*footer container */}
        <View
          style={{
            flex: 1,
            marginBottom: 21,
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
    currentStepLabelColor: COLOR.text_primary_color,
    labelColor: COLOR.text_primary_color,
  },

  instruction_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'justify',
  },
});

export default SellerIdentificationScreen;
