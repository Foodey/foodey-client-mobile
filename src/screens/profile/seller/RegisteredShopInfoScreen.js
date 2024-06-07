import { View, Text, SafeAreaView, StyleSheet, StatusBar, TextInput } from 'react-native';
import React from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, PressableInputField, ShortInputField } from '../../../components/seller';
import { SubmitButton } from '../../../components';

const RegisteredShopInfoScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title="Edit Shop Info"
        isRightButtonVisible={true}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 9 }}>
          <ShortInputField title="Shop Name" placeholder="Enter Shop Name" isRequired={true} />
          <PressableInputField
            isRequired={true}
            title="Pickup Address"
            value=""
            style={{ marginTop: 100 }}
          />
          <PressableInputField isRequired={true} title="Phone Number" value="" />
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 21,
            marginHorizontal: 10,
            flexDirection: 'row',
            paddingVertical: 10,
          }}
        >
          <SubmitButton
            style={{ flex: 1 }}
            title={'Back'}
            buttonColor={COLOR.button_red_color}
            hoverColor={COLOR.button_red_color}
            // onPressFunction={() => navigation.navigate('RegisteredShopInfo_Screen')}
          />
          <SubmitButton
            style={{ flex: 1, marginStart: 10 }}
            title={'Next'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            // onPressFunction={() => navigation.navigate('RegisteredShopInfo_Screen')}
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
});

export default RegisteredShopInfoScreen;
