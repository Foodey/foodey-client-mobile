import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { BackButton } from '../../components';
import { ProfileTextInput, ProfileScreenHeader } from '../../components/profile';
import { COLOR } from '../../constants/Colors';

const SettingScreen = ({ navigation }) => {
  const onBackPressFunction = () => {
    navigation.goBack();
  };

  const onContactInfoPress = () => {
    navigation.navigate('ContactInfo_Screen');
  };

  const onPassChangePress = () => {
    navigation.navigate('PassChange_Screen');
  };

  const onAccountDeletionPress = () => {
    navigation.navigate('AccountDeletion_Screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <ProfileScreenHeader title="Settings" onBackPressFunction={onBackPressFunction} />
      <View style={{ paddingHorizontal: 21 }}>
        <Text style={styles.section_header_text}>Account Settings</Text>
        <ProfileTextInput
          style={{ marginVertical: 5 }}
          editable={false}
          value="Information & Contact"
          onPressFunction={onContactInfoPress}
        />
        <ProfileTextInput
          style={{ marginVertical: 5 }}
          editable={false}
          value="Change Password"
          onPressFunction={onPassChangePress}
        />
      </View>
      <View style={{ paddingHorizontal: 21, marginTop: 21 }}>
        <Text style={styles.section_header_text}>Support</Text>
        <ProfileTextInput
          style={{ marginVertical: 5 }}
          editable={false}
          value="Request Account Deletion"
          onPressFunction={onAccountDeletionPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  section_header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 20,
    color: COLOR.text_pink_color,
    marginBottom: 10,
  },
});

export default SettingScreen;
