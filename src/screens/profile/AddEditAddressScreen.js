import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { BackButton, SubmitButton } from '../../components';
import { ProfileTextInput } from '../../components/profile';

const AddEditAddressScreen = ({ navigation, route }) => {
  const { id, name, phoneNumber, type, address, isNewAddress } = route.params;

  const [inputs, setInputs] = useState({
    fullName: name,
    phoneNumber: phoneNumber,
    address: address,
    addressType: type,
  });

  const [inputsErrorMessage, setInputsErrorMessage] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    addressType: '',
  });

  const handleInputsChanged = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleInputsErrors = (errorMessage, input) => {
    setInputsErrorMessage((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const onBackPressFunction = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={styles.header_container}>
        <BackButton style={styles.back_button} onPressFunction={onBackPressFunction} />
        <Text style={styles.header_text}>
          {isNewAddress === true ? 'New Address' : 'Edit Address'}
        </Text>
      </View>
      <View style={styles.content_container}>
        <ProfileTextInput
          style={{ marginHorizontal: 21, marginTop: 21 }}
          value={inputs.fullName}
          placeholder="Full Name"
          errorMessage={inputsErrorMessage.fullName}
          onChangeText={(text) => {
            handleInputsErrors('', 'fullName');
            handleInputsChanged(text, 'fullName');
          }}
        />
        <ProfileTextInput
          style={{ marginHorizontal: 21, marginTop: 3 }}
          value={inputs.phoneNumber}
          placeholder="Phone Number"
          errorMessage={inputsErrorMessage.phoneNumber}
          onChangeText={(text) => {
            handleInputsErrors('', 'phoneNumber');
            handleInputsChanged(text, 'phoneNumber');
          }}
        />

        <ProfileTextInput
          style={{ marginHorizontal: 21, marginTop: 31 }} //The address should be uneditable and when user click on it it will navigate to the screen for user to choose address based on map
          value={inputs.address}
          placeholder="Select Address"
          errorMessage={inputsErrorMessage.address}
          onChangeText={(text) => {
            handleInputsErrors('', 'address');
            handleInputsChanged(text, 'address');
          }}
        />
        <ProfileTextInput
          style={{ marginHorizontal: 21, marginTop: 3 }}
          value={inputs.addressType}
          placeholder="Type of Address"
          errorMessage={inputsErrorMessage.addressType}
          onChangeText={(text) => {
            handleInputsErrors('', 'addressType');
            handleInputsChanged(text, 'addressType');
          }}
        />
      </View>
      <SubmitButton
        style={{ height: '7%', margin: 21 }}
        title={'Save'}
        buttonColor={COLOR.button_primary_color}
        hoverColor={COLOR.button_press_primary_color}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  content_container: {
    flex: 1,
  },

  header_container: {
    height: '18%',
    marginHorizontal: 21,
    // backgroundColor: "#ff0"
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    flex: 2.5,
    marginTop: 20,
  },

  back_button: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AddEditAddressScreen;
