import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox, PhoneNumberBox } from '~/components/authenticate';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { UtilityCard, SubmitButton, BackButton } from '../../components';

export default function SignUpPasskeyScreen({ navigation }) {
  const { signUpInputs, handleSignUpInputsChanged, signUpErrorMessages, handleSignUpErrors } =
    useContext(AuthContext);

  const onSignUpWithPasskeyPress = () => {
    //do something
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackButton onPressFunction={onBackPress} />
      <UtilityCard
        style={styles.header_container}
        title="Welcome!"
        title_style={{ marginBottom: 0 }}
        content="Sign up with Passkey"
      />
      <ScrollView style={{ marginTop: 50 }}>
        <InputBox
          value={signUpInputs.fullName}
          title="Full Name"
          placeholder="Enter your full name"
          errorMessage={signUpErrorMessages.fullName}
          style={{ marginBottom: 6 }}
          onChangeText={(text) => {
            handleSignUpErrors('', 'fullName');
            handleSignUpInputsChanged(text, 'fullName');
          }}
          onDeletePress={() => {
            handleSignUpInputsChanged('', 'fullName');
          }}
        />
        <PhoneNumberBox
          value={signUpInputs.phoneNumber}
          errorMessage={signUpErrorMessages.phoneNumber}
          style={{ marginBottom: 6 }}
          onChangeText={(text) => {
            handleSignUpErrors('', 'phoneNumber');
            handleSignUpInputsChanged(text, 'phoneNumber');
          }}
          onDeletePress={() => {
            handleSignUpInputsChanged('', 'phoneNumber');
          }}
        />
      </ScrollView>
      <View style={styles.footer_container}>
        <SubmitButton
          showIcon={true}
          style={{ marginBottom: 250, height: '15%' }}
          title={'Sign Up With Passkey'}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={onSignUpWithPasskeyPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
    paddingHorizontal: 21,
  },
});
