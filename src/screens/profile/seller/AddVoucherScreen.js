import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, ShortInputField, PressableInputField } from '../../../components/seller';
import { SubmitButton } from '../../../components';
import DateTimePicker from 'react-native-modal-datetime-picker';

const AddEditVoucherScreen = ({ navigation, route }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onAddPress = () => {
    //
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <DateTimePicker isVisible={isDatePickerVisible} mode="datetime" />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title={'Add Voucher'}
      />

      <View style={{ flex: 1 }}>
        {/*content container */}
        <ScrollView style={{ height: '80%', marginTop: 10 }} showsVerticalScrollIndicator={false}>
          <Text
            style={[
              styles.instruction_text,
              {
                fontSize: 16,
                color: COLOR.indicator_current_color,
                fontFamily: 'Manrope-Bold',
                paddingTop: 0,
              },
            ]}
          >
            Voucher with good and attractive photo would likely got ordered by the customer. Make
            sure the uploaded photo has a a 1:1 image ratio.
          </Text>
          <ShortInputField title="Name" placeholder="Enter Voucher Name" isRequired={true} />
          <ShortInputField
            title="Description"
            placeholder="Enter Voucher Description"
            isRequired={false}
          />
          <ShortInputField
            title="Price"
            placeholder="ex: 200000"
            isRequired={true}
            keyboardType="numeric"
          />
          <Text style={styles.instruction_text}>
            Make sure not to include splitting characters like ',' or '.' for Voucher Price.
          </Text>
          <PressableInputField title="Voucher Category" isRequired={true} />
        </ScrollView>
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
            style={{ flex: 1 }}
            title={'Add'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={() => onAddPress()}
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

  policy_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16.5,
    textAlign: 'justify',
    color: COLOR.indicator_current_color,
  },

  instruction_text: {
    padding: 10,
    paddingTop: 0,
    marginBottom: 10,
  },
});

export default AddEditVoucherScreen;
