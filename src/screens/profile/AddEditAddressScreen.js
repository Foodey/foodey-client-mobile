import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { BackButton, SubmitButton } from '../../components';
import { ProfileTextInput, ProfileScreenHeader } from '../../components/profile';

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

  const onSelectAddressPress = () => {
    navigation.navigate('SelectAddress_Screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader
        title={isNewAddress ? 'New Address' : 'Edit Address'}
        onBackPressFunction={onBackPressFunction}
      />
      <View style={styles.content_container}>
        <ProfileTextInput
          editable={true}
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
          editable={true}
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
          editable={false}
          style={{ marginHorizontal: 21, marginTop: 31, marginBottom: 21 }} //The address should be uneditable and when user click on it it will navigate to the screen for user to choose address based on map
          value={inputs.address}
          placeholder="Select Address"
          errorMessage={inputsErrorMessage.address}
          onPressFunction={() => onSelectAddressPress()}
        />
        <ProfileTextInput
          editable={true}
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
        style={{ height: '7%', margin: 21, marginBottom: 250 }}
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
});

export default AddEditAddressScreen;
