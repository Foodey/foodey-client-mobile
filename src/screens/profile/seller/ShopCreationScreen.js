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
import React, { useState, useContext } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, ShortInputField, PressableInputField } from '../../../components/seller';
import { SubmitButton } from '../../../components';
import HTTPStatus from '../../../constants/HTTPStatusCodes';
import { getShopOfBrandAPI } from '../../../apiServices/SellerService';
import { SellerContext } from '../../../contexts/SellerContext';

const ShopCreationScreen = ({ navigation, route }) => {
  const { brandID, brandLogo, brandWallpaper } = route.params;

  const { getShops } = useContext(SellerContext);

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onSelectAddressPress = () => {
    //
    setShopAddressErr('');
    //setShopAddress();
  };

  const onCreatePress = async () => {
    //verify inputs logic
    let isValid = true;

    if (shopName === '') {
      setShopNameErr('Please input your shop name');
      isValid = false;
    } else if (shopName.length > 18) {
      setShopNameErr('Shop name should be maximum of 40 characters only');
      isValid = false;
    }

    // if(shopAddress === ''){
    //   setShopAddressErr('Please input your shop address');
    //   isValid = false;
    // }

    if (isValid) {
      //createNewShop();
      await getShops(brandID);
      setShopName('');
      setShopNameErr('');
      setShopAddress('');
      setShopAddressErr('');
      navigation.goBack();
    }
  };

  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');

  const [shopNameErr, setShopNameErr] = useState('');
  const [shopAddressErr, setShopAddressErr] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title="Shop Creation"
      />
      <View style={{ flex: 1 }}>
        {/*content container */}
        <ScrollView style={{ height: '80%' }} showsVerticalScrollIndicator={false}>
          <Text style={styles.instruction_text}>Shop Information</Text>
          <ShortInputField
            title="Shop Name"
            placeholder="Enter Shop Name"
            isRequired={true}
            value={shopName}
            errorMessage={shopNameErr}
            onChangeText={(value) => {
              setShopNameErr('');
              setShopName(value);
            }}
          />
          <View style={styles.instruction_container}>
            <Text
              style={[
                styles.instruction_text,
                {
                  fontSize: 16,
                  color: COLOR.text_secondary_color,
                  fontFamily: 'Manrope-Medium',
                  paddingVertical: 0,
                },
              ]}
            >
              To gain attention from the customer, your shop should be named in this order:
            </Text>
            <Text
              style={[
                {
                  fontSize: 16,
                  color: COLOR.text_pink_color,
                  fontFamily: 'Manrope-Bold',
                  marginTop: 5,
                  alignSelf: 'center',
                },
              ]}
            >
              [Signature Dish] [Brand Name] - [Branch No.]
            </Text>
            <Text
              style={{
                fontFamily: 'Manrope-Medium',
                fontSize: 16,
                color: COLOR.text_secondary_color,
                alignSelf: 'center',
              }}
            >
              - or -
            </Text>
            <Text
              style={[
                {
                  fontSize: 16,
                  color: COLOR.text_pink_color,
                  fontFamily: 'Manrope-Bold',
                  alignSelf: 'center',
                },
              ]}
            >
              [Signature Dish] [Brand Name] - [Name of Road]
            </Text>
          </View>
          <PressableInputField
            title="Address"
            onPressFunction={onSelectAddressPress}
            value={shopAddress}
            errorMessage={shopAddressErr}
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
            title={'Create Shop'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={() => onCreatePress()}
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

  instruction_container: {
    borderWidth: 2,
    borderColor: COLOR.text_secondary_color,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: COLOR.background_color,
    paddingHorizontal: 2,
    marginHorizontal: 15,
  },

  instruction_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'justify',
    color: COLOR.text_secondary_color,
  },

  policy_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16.5,
    textAlign: 'justify',
    color: COLOR.indicator_current_color,
  },
});

export default ShopCreationScreen;
