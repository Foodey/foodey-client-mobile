import { View, Text, SafeAreaView, StatusBar, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { ProfileScreenHeader, ProfileTextInput } from '../../components/profile';
import { ArrowRight } from '../../resources/icons';
import { SubmitButton } from '../../components';

const PassChangeScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const onChangePassPress = () => {
    //handle format and validate before changing password
  };

  const [inputs, setInputs] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: '',
  });

  const [inputsErrorMessage, setInputsErrorMessage] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: '',
  });

  const handleInputsChanged = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleInputsErrors = (errorMessage, input) => {
    setInputsErrorMessage((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader title="Password Change" onBackPressFunction={onBackPress} />
      <View style={styles.content_container}>
        <ProfileTextInput
          isPassword={true}
          editable={true}
          placeholder="Current Password"
          value={inputs.currentPass}
          errorMessage={inputsErrorMessage.currentPass}
          onChangeText={(text) => {
            handleInputsErrors('', 'currentPass');
            handleInputsChanged(text, 'currentPass');
          }}
        />
        <ProfileTextInput
          isPassword={true}
          editable={true}
          placeholder="New Password"
          value={inputs.newPass}
          errorMessage={inputsErrorMessage.newPass}
          onChangeText={(text) => {
            handleInputsErrors('', 'newPass');
            handleInputsChanged(text, 'newPass');
          }}
        />
        <ProfileTextInput
          isPassword={true}
          editable={true}
          placeholder="Confirm Password"
          value={inputs.confirmPass}
          errorMessage={inputsErrorMessage.confirmPass}
          onChangeText={(text) => {
            handleInputsErrors('', 'confirmPass');
            handleInputsChanged(text, 'confirmPass');
          }}
        />
      </View>
      <SubmitButton
        style={{ height: '7%', margin: 21 }}
        title={'Save'}
        buttonColor={COLOR.button_primary_color}
        hoverColor={COLOR.button_press_primary_color}
        onPressFunction={onChangePassPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  avatar_container: {
    flexDirection: 'row',
    // backgroundColor: '#0f0',
    paddingHorizontal: 21,
  },

  content_container: {
    paddingHorizontal: 21,
    marginTop: 21,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 100,
  },

  changeAvatar_text: {
    marginStart: 'auto',
    fontFamily: 'Manrope-Regular',
    fontSize: 17,
    color: COLOR.text_secondary_color,
  },
});

export default PassChangeScreen;
