import { View, Text, SafeAreaView, StatusBar, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { ProfileScreenHeader, ProfileTextInput } from '../../components/profile';
import { ArrowRight } from '../../resources/icons';
import { SubmitButton } from '../../components';

const ContactInfoScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const onSaveInfoPress = () => {
    //handle format before saving
  };

  const [inputs, setInputs] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const [inputsErrorMessage, setInputsErrorMessage] = useState({
    fullName: '',
    phoneNumber: '',
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
      <ProfileScreenHeader title="Contact Information" onBackPressFunction={onBackPress} />
      <Pressable style={styles.avatar_container}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg',
          }}
          style={styles.avatar}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: 'auto',
          }}
        >
          <Text style={styles.changeAvatar_text}>Change Avatar</Text>
          <ArrowRight style={{ color: COLOR.text_secondary_color, marginTop: 4 }} />
        </View>
      </Pressable>
      <View style={styles.content_container}>
        <ProfileTextInput
          editable={true}
          placeholder="Full Name"
          value={inputs.fullName}
          errorMessage={inputsErrorMessage.fullName}
          onChangeText={(text) => {
            handleInputsErrors('', 'fullName');
            handleInputsChanged(text, 'fullName');
          }}
        />
        <ProfileTextInput
          editable={true}
          placeholder="Phone Number"
          value={inputs.phoneNumber}
          errorMessage={inputsErrorMessage.phoneNumber}
          onChangeText={(text) => {
            handleInputsErrors('', 'phoneNumber');
            handleInputsChanged(text, 'phoneNumber');
          }}
        />
      </View>
      <SubmitButton
        style={{ height: '7%', margin: 21 }}
        title={'Save'}
        buttonColor={COLOR.button_primary_color}
        hoverColor={COLOR.button_press_primary_color}
        onPressFunction={onSaveInfoPress}
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

export default ContactInfoScreen;
