import { View, StyleSheet, Text, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { CountryPicker } from 'react-native-country-codes-picker';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import ArrowDown from '~/resources/icons/arrow-down.svg';

function PhoneNumberBox(props) {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');

  return (
    <View style={{ ...props.style }}>
      <Text style={styles.title_text}>Phone Number</Text>
      <View style={styles.input_container}>
        <Pressable onPress={() => setShow(true)} style={styles.button_select_countryCode}>
          <Text style={styles.countryCode_text}>{countryCode}</Text>
          <ArrowDown
            width={22}
            height={27}
            style={{ color: COLOR.text_secondary_color, marginStart: 4, marginEnd: 15 }}
          />
          <CountryPicker
            style={{}}
            show={show}
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setShow(false);
            }}
          />
          <View style={styles.vertical_split} />
        </Pressable>
        <TextInput
          placeholder="Enter your phone number"
          style={styles.phone_number_input}
          placeholderTextColor={COLOR.text_press_color}
          onChangeText={props.onChangeText}
        />
        <Pressable style={styles.button_delete_input}></Pressable>
      </View>
      <Text style={styles.text_errorMessage}>{props.errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title_text: {
    fontWeight: '400',
    fontSize: 17,
    color: COLOR.text_primary_color,
    marginBottom: 10,
    marginStart: 13,
    fontFamily: 'Manrope',
  },

  input_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: COLOR.text_primary_color,
    borderRadius: 14,
  },

  button_select_countryCode: {
    flex: 2,
    flexDirection: 'row',
  },

  countryCode_text: {
    fontSize: 17,
    color: COLOR.text_primary_color,
    paddingLeft: 10,
    fontFamily: 'Manrope',
  },

  vertical_split: {
    height: 24,
    width: 1,
    backgroundColor: COLOR.text_press_color,
  },

  phone_number_input: {
    flex: 4.25,
    height: 52,
    fontSize: 17,
    color: COLOR.text_primary_color,
    paddingLeft: 12,
    fontFamily: 'Manrope',
  },

  button_delete_input: {
    flex: 1,
  },

  text_errorMessage: {
    marginStart: 13,
    marginTop: 3,
    color: COLOR.text_errorMessage_color,
  },
});

export default PhoneNumberBox;
