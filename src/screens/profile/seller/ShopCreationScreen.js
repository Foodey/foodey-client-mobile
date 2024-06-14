import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useContext, useLayoutEffect } from 'react';
import { COLOR } from '../../../constants/Colors';
import {
  IntroHeader,
  ShortInputField,
  PressableInputField,
  ImageInput,
} from '../../../components/seller';
import { SubmitButton } from '../../../components';
import { SellerContext } from '../../../contexts/SellerContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { handleUploadImageFromDevice } from '../../../utils/Cloudinary';
import { PhotoSelectionModal } from '../../../components/messageBoxes';
import { createNewShopAPI } from '../../../apiServices/SellerService';
import HTTPStatus from '../../../constants/HTTPStatusCodes';

const ShopCreationScreen = ({ navigation, route }) => {
  const { brandID, brandLogo, brandWallpaper } = route.params;

  const { getShops, contextShopLocation } = useContext(SellerContext);

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onLogoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        setLogoImageErr('');
        setLogoImage(result.assets[0]);
        setIsLogoModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log('Camera permission denied ' + err);
    }
  };

  const onWallpaperOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        setWallpaperImageErr('');
        setWallpaperImage(result.assets[0]);
        setIsWallpaperModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log('Camera permission denied ' + err);
    }
  };

  const onLogoOpenLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        setLogoImageErr('');
        setLogoImage(result.assets[0]);
        setIsLogoModalVisible(false);
      } else {
        console.log('Library permission denied');
      }
    } catch (err) {
      console.log('Library permission denied ' + err);
    }
  };

  const onWallpaperOpenLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        setWallpaperImageErr('');
        setWallpaperImage(result.assets[0]);
        setIsWallpaperModalVisible(false);
      } else {
        console.log('Library permission denied');
      }
    } catch (err) {
      console.log('Library permission denied ' + err);
    }
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

    if (logoImage === '') {
      setLogoImageErr('Please provide the front side of the image');
      isValid = false;
    }

    if (wallpaperImage === '') {
      setWallpaperImageErr('Please provide the front side of the image');
      isValid = false;
    }

    if (Object.keys(contextShopLocation).length === 0) {
      setShopLocationErr('Please picking your shop location');
      isValid = false;
    }

    if (shopAddress === '') {
      setShopAddressErr('Please input your shop address');
      isValid = false;
    }

    if (isValid) {
      const isSuccess = await createNewShop(
        brandID,
        shopName,
        shopAddress,
        logoImage,
        wallpaperImage,
      );
      if (isSuccess) {
        await getShops(brandID);
        setShopName('');
        setShopNameErr('');
        setShopAddress('');
        setShopAddressErr('');
        setLogoImage('');
        setLogoImageErr('');
        setWallpaperImage('');
        setWallpaperImageErr('');
        navigation.goBack();
      } else {
        setShopAddressErr('Unexpected error, please try again later!!');
        setShopNameErr('Unexpected error, please try again later!!');
        setLogoImageErr('Unexpected error, please try again later!!');
        setWallpaperImageErr('Unexpected error, please try again later!!');
      }
    }
  };

  const createNewShop = async (brandID, name, address, logoURL, wallpaperURL) => {
    try {
      const response = await createNewShopAPI(brandID, name, address);
      if (response.status === HTTPStatus.CREATED) {
        await handleUploadImageFromDevice(logoURL, response?.data?.logoUploadApiOptions);
        await handleUploadImageFromDevice(wallpaperURL, response?.data?.wallpaperUploadApiOptions);

        console.log('Success all');
        return true;
      } else {
        console.log('Error when create new shop');
        return false;
      }
    } catch (err) {
      console.log('Error when create new shop ' + err);
      return false;
    }
  };

  const onShopLocationPress = () => {
    setShopLocationErr('');
    navigation.navigate('SelectAddress_Screen');
  };

  const coordinateObjectToString = (coordObj) => {
    const values = Object.values(coordObj);
    return values.join(', ');
  };

  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState({});
  const [shopAddress, setShopAddress] = useState(''); //Temp Address
  const [logoImage, setLogoImage] = useState('');
  const [wallpaperImage, setWallpaperImage] = useState('');

  const [shopNameErr, setShopNameErr] = useState('');
  const [logoImageErr, setLogoImageErr] = useState('');
  const [shopLocationErr, setShopLocationErr] = useState('');
  const [shopAddressErr, setShopAddressErr] = useState('');
  const [wallpaperImageErr, setWallpaperImageErr] = useState('');

  const [isLogoModalVisible, setIsLogoModalVisible] = useState(false);
  const [isWallpaperModalVisible, setIsWallpaperModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <PhotoSelectionModal
        isVisible={isLogoModalVisible}
        backdropPress={() => setIsLogoModalVisible(false)}
        openCameraPress={() => onLogoOpenCamera()}
        openLibraryPress={() => onLogoOpenLibrary()}
      />
      <PhotoSelectionModal
        isVisible={isWallpaperModalVisible}
        backdropPress={() => setIsWallpaperModalVisible(false)}
        openCameraPress={() => onWallpaperOpenCamera()}
        openLibraryPress={() => onWallpaperOpenLibrary()}
      />
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
          <Text style={[styles.instruction_text, { marginTop: 0 }]}>
            Input your Shop address and location. Make sure to choose your exact Shop location
            because this will be used to recommend your shop to near-by user.
          </Text>
          <PressableInputField
            isRequired={true}
            // isCoordinate={true}
            title="Shop Location"
            value={
              Object.keys(contextShopLocation).length === 0
                ? ''
                : coordinateObjectToString(contextShopLocation)
            }
            errorMessage={shopLocationErr}
            onPressFunction={() => onShopLocationPress()}
          />
          <ShortInputField
            title="Shop Address"
            placeholder="Enter Shop Address"
            isRequired={true}
            value={shopAddress}
            errorMessage={shopAddressErr}
            onChangeText={(value) => {
              setShopAddressErr('');
              setShopAddress(value);
            }}
          />
          <Text style={[styles.instruction_text, { marginTop: 0 }]}>
            Brand with Logo are most likely to be visited by customers. Make sure the uploaded logo
            has a a 1:1 image ratio.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of your Brand Logo (1:1)"
            onPhotoActionPress={() => setIsLogoModalVisible(true)}
            imageURI={logoImage?.uri}
            onDeletePress={() => setLogoImage('')}
            errorMessage={logoImageErr}
          />
          <Text style={[styles.instruction_text, { marginTop: 0 }]}>
            Wallpaper makes your Brand menu screen better. Make sure the uploaded wallpaper has a
            3:2 image ratio.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of your Brand Wallpaper (3:2)"
            onPhotoActionPress={() => setIsWallpaperModalVisible(true)}
            imageURI={wallpaperImage?.uri}
            onDeletePress={() => setWallpaperImage('')}
            errorMessage={wallpaperImageErr}
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
