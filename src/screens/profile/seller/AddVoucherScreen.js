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
import { RadioButton } from 'react-native-paper';
import { Discount } from '../../../resources/icons';
import { formatDateTimeFromDateObject } from '../../../utils/ValueConverter';

const AddEditVoucherScreen = ({ navigation, route }) => {
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [isExpiredDatePickerVisible, setIsExpiredDatePickerVisible] = useState(false);

  const [discountMethod, setDiscountMethod] = useState('PERCENTAGE');
  const [startDate, setStartDate] = useState();
  const [expiredDate, setExpiredDate] = useState();

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onAddPress = () => {
    //
  };

  const onStartDateConfirm = (dateTime) => {
    setStartDate(dateTime);
    setIsStartDatePickerVisible(false);
  };

  const onExpiredDateConfirm = (dateTime) => {
    setExpiredDate(dateTime);
    setIsExpiredDatePickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <DateTimePicker
        is24Hour={true}
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onCancel={() => setIsStartDatePickerVisible(false)}
        onConfirm={onStartDateConfirm}
      />
      <DateTimePicker
        is24Hour={true}
        isVisible={isExpiredDatePickerVisible}
        mode="datetime"
        onCancel={() => setIsExpiredDatePickerVisible(false)}
        onConfirm={onExpiredDateConfirm}
      />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title={'Add Voucher'}
      />

      <View style={{ flex: 1 }}>
        {/*content container */}
        <ScrollView style={{ height: '80%', marginTop: 10 }} showsVerticalScrollIndicator={false}>
          <ShortInputField
            title="Voucher Code"
            placeholder="Enter Voucher Code"
            isRequired={true}
          />
          <Text style={styles.instruction_text}>
            To improve brand recognition, a voucher code should be name with the 4 first letter of
            your Shop name, for example:{' '}
            <Text style={{ fontFamily: 'Manrope-Bold', color: COLOR.text_pink_color }}>
              FDEY50K.
            </Text>
          </Text>
          <PressableInputField
            value={startDate ? formatDateTimeFromDateObject(startDate) : ''}
            isRequired={true}
            title="Starting Date"
            onPressFunction={() => setIsStartDatePickerVisible(true)}
          />
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                borderBottomColor: COLOR.text_secondary_color,
                borderBottomWidth: 2,
                marginHorizontal: 190,
              }}
            ></View>
          </View>
          <PressableInputField
            value={expiredDate ? formatDateTimeFromDateObject(expiredDate) : ''}
            isRequired={true}
            title="Expired Date"
            onPressFunction={() => setIsExpiredDatePickerVisible(true)}
          />
          <Text style={styles.instruction_text}>
            Choosing the starting and expired data of your Voucher.
          </Text>
          <View style={styles.radio_button_container}>
            <Text
              style={{
                flex: 1,
                fontFamily: 'Manrope-Medium',
                fontSize: 16.5,
                color: COLOR.text_primary_color,
              }}
            >
              Discount Method <Text style={{ color: COLOR.text_errorMessage_color }}>*</Text>
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <RadioButton
                value="Percentage"
                status={discountMethod === 'PERCENTAGE' ? 'checked' : 'unchecked'}
                onPress={() => setDiscountMethod('PERCENTAGE')}
                color={COLOR.indicator_current_color}
                uncheckedColor={COLOR.indicator_current_color}
              />
              <Text
                style={{
                  fontFamily: 'Manrope-Bold',
                  fontSize: 14,
                  color: COLOR.indicator_current_color,
                }}
              >
                Percentage
              </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginStart: 10 }}>
              <RadioButton
                value="Specific Amount"
                status={discountMethod === 'SPECIAL_AMOUNT' ? 'checked' : 'unchecked'}
                onPress={() => setDiscountMethod('SPECIAL_AMOUNT')}
                color={COLOR.indicator_current_color}
                uncheckedColor={COLOR.indicator_current_color}
              />
              <Text
                style={{
                  fontFamily: 'Manrope-Bold',
                  fontSize: 14,
                  color: COLOR.indicator_current_color,
                }}
              >
                Specific Amount
              </Text>
            </View>
          </View>
          <ShortInputField
            title="Minimum to Apply"
            placeholder="ex: 200000"
            isRequired={true}
            keyboardType="numeric"
          />
          <Text style={styles.instruction_text}>
            The minimum value of order that Customer need to reach to apply the Voucher.
          </Text>
          <ShortInputField
            title="Quantity"
            placeholder="Enter Quantity"
            isRequired={true}
            keyboardType="numeric"
          />
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

  radio_button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.background_color,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_press_color,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  radio_button: {
    width: 50,
    height: 50,
  },

  policy_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16.5,
    textAlign: 'justify',
    color: COLOR.indicator_current_color,
  },

  instruction_text: {
    fontFamily: 'Manrope-Medium',
    color: COLOR.text_secondary_color,
    padding: 10,
    paddingTop: 0,
    marginBottom: 10,
  },
});

export default AddEditVoucherScreen;
