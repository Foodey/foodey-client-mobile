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
import {
  IntroHeader,
  ShortInputField,
  ImageInput,
  PressableInputField,
} from '../../../components/seller';
import { SubmitButton } from '../../../components';
import Checkbox from 'expo-checkbox';
import { PhotoSelectionModal } from '../../../components/messageBoxes';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import HTTPStatus from '../../../constants/HTTPStatusCodes';
import { getSellerBrandAPI, createNewBrandAPI } from '../../../apiServices/SellerService';
import { SellerContext } from '../../../contexts/SellerContext';
import { cldUpload, handleUploadImage } from '../../../utils/Cloudinary';

const BrandCreationScreen = ({ navigation }) => {
  const { getBrands } = useContext(SellerContext);

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onSelectAddressPress = () => {
    //
  };

  const onCreatePress = async () => {
    let isValid = true;
    const phoneRegex = '^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$';
    const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';

    if (brandInfoInput.brandName === '') {
      handleBrandInfoErrorsChanged('brandName', 'Please input your brand name');
      isValid = false;
    } else if (brandInfoInput.brandName.length > 18) {
      handleBrandInfoErrorsChanged(
        'brandName',
        'Brand name should be short, maximum of 18 characters only',
      );
      isValid = false;
    }

    if (brandInfoInput.phoneNumber === '') {
      handleBrandInfoErrorsChanged('phoneNumber', 'Please input your phone number');
      isValid = false;
    } else if (!brandInfoInput.phoneNumber.match(phoneRegex)) {
      handleBrandInfoErrorsChanged('phoneNumber', 'Invalid phone number formateNumber');
      isValid = false;
    }

    if (brandInfoInput.email === '') {
      handleBrandInfoErrorsChanged('email', 'Please input your email');
      isValid = false;
    } else if (!brandInfoInput.email.match(emailRegex)) {
      handleBrandInfoErrorsChanged('email', 'Invalid email format, please re-check');
      isValid = false;
    }

    if (brandInfoInput.logoImage === '') {
      handleBrandInfoErrorsChanged('logoImage', 'Please provide the front side of the image');
      isValid = false;
    }

    if (brandInfoInput.wallpaperImage === '') {
      handleBrandInfoErrorsChanged('wallpaperImage', 'Please provide the back side of the image');
      isValid = false;
    }

    if (isValid) {
      const isSuccess = await createNewBrand(
        brandInfoInput.brandName,
        brandInfoInput.phoneNumber,
        brandInfoInput.email,
        brandInfoInput.logoImage,
        brandInfoInput.wallpaperImage,
      );
      if (isSuccess) {
        await getBrands();
        clearInput();
        clearErrorMessage();
        navigation.navigate('SellerBrandList_Screen');
      } else {
        handleBrandInfoErrorsChanged('brandName', 'Unexpected error, please try again later!!');
        handleBrandInfoErrorsChanged('phoneNumber', 'Unexpected error, please try again later!!');
        handleBrandInfoErrorsChanged('email', 'Unexpected error, please try again later!!');
        handleBrandInfoErrorsChanged('logoImage', 'Unexpected error, please try again later!!');
        handleBrandInfoErrorsChanged(
          'wallpaperImage',
          'Unexpected error, please try again later!!',
        );
      }
    }
  };

  const createNewBrand = async (name, phoneNumber, email, logoURL, wallpaperURL) => {
    try {
      console.log(logoURL);
      console.log(wallpaperURL);
      const response = await createNewBrandAPI(name, phoneNumber, email);
      if (response.status === HTTPStatus.CREATED) {
        await handleUploadImage(logoURL, response?.data?.logoUploadApiOptions);
        console.log('Success upload logo');
        await handleUploadImage(wallpaperURL, response?.data?.wallpaperUploadApiOptions);

        console.log('Success all');
        return true;
      } else {
        console.log('Error when create new brand');
        return false;
      }
    } catch (err) {
      console.log('Error when create new brand ' + err);
      return false;
    }
  };

  const [toggleCheckbox, setToggleCheckbox] = useState(false);

  const [isLogoModalVisible, setIsLogoModalVisible] = useState(false);
  const [isWallpaperModalVisible, setIsWallpaperModalVisible] = useState(false);
  const [brandInfoInput, setBrandInfoInput] = useState({
    brandName: '',
    phoneNumber: '',
    email: '',
    logoImage: '',
    wallpaperImage: '',
  });

  const [brandInfoInputErrors, setBrandInfoInputErrors] = useState({
    brandName: '',
    phoneNumber: '',
    email: '',
    logoImage: '',
    wallpaperImage: '',
  });

  const handleBrandInfoChanged = (field, value) => {
    setBrandInfoInput((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleBrandInfoErrorsChanged = (field, errorMessage) => {
    setBrandInfoInputErrors((prevState) => ({ ...prevState, [field]: errorMessage }));
  };

  const clearInput = () => {
    setBrandInfoInput({
      brandName: '',
      phoneNumber: '',
      email: '',
      logoImage: '',
      wallpaperImage: '',
    });
  };

  const clearErrorMessage = () => {
    setBrandInfoInputErrors({
      brandName: '',
      phoneNumber: '',
      email: '',
      logoImage: '',
      wallpaperImage: '',
    });
  };

  const onLogoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        handleBrandInfoErrorsChanged('logoImage', '');
        handleBrandInfoChanged('logoImage', result.assets[0]);
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
        handleBrandInfoErrorsChanged('wallpaperImage', '');
        handleBrandInfoChanged('wallpaperImage', result.assets[0]);
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
        // console.log(result.assets[0]);
        handleBrandInfoErrorsChanged('logoImage', '');
        handleBrandInfoChanged('logoImage', result.assets[0]);
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
        // console.log(result.assets[0]);
        handleBrandInfoErrorsChanged('wallpaperImage', '');
        handleBrandInfoChanged('wallpaperImage', result.assets[0]);
        setIsWallpaperModalVisible(false);
      } else {
        console.log('Library permission denied');
      }
    } catch (err) {
      console.log('Library permission denied ' + err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={
          isLogoModalVisible || isWallpaperModalVisible
            ? 'rgba(0, 0, 0, 0.35)'
            : COLOR.background_color
        }
      />
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
        title="Brand Creation"
      />
      <View style={{ flex: 1 }}>
        {/*content container */}
        <ScrollView style={{ height: '80%' }} showsVerticalScrollIndicator={false}>
          <Text style={styles.instruction_text}>Brand Information</Text>
          <ShortInputField
            value={brandInfoInput.brandName}
            title="Brand Name"
            placeholder="Enter Brand Name"
            isRequired={true}
            onChangeText={(value) => {
              handleBrandInfoErrorsChanged('brandName', '');
              handleBrandInfoChanged('brandName', value);
            }}
            errorMessage={brandInfoInputErrors.brandName}
          />
          <Text
            style={[
              styles.instruction_text,
              {
                fontSize: 16,
                color: COLOR.text_pink_color,
                fontFamily: 'Manrope-Bold',
                paddingVertical: 0,
              },
            ]}
          >
            To gain attention from the customer, your brand should be named in this order:
          </Text>
          <Text
            style={[
              {
                fontSize: 16,
                color: COLOR.text_pink_color,
                fontFamily: 'Manrope-Bold',
                marginBottom: 20,
                paddingHorizontal: 15,
              },
            ]}
          >
            [Signature Dish] + [Shop Name]
          </Text>
          <ShortInputField
            title="Phone Number"
            placeholder="Enter Phone Number"
            isRequired={true}
            keyboardType="numeric"
            value={brandInfoInput.phoneNumber}
            onChangeText={(value) => {
              handleBrandInfoErrorsChanged('phoneNumber', '');
              handleBrandInfoChanged('phoneNumber', value);
            }}
            errorMessage={brandInfoInputErrors.phoneNumber}
          />
          <ShortInputField
            title="Email"
            placeholder="Enter Your Email"
            isRequired={true}
            value={brandInfoInput.email}
            onChangeText={(value) => {
              handleBrandInfoErrorsChanged('email', '');
              handleBrandInfoChanged('email', value);
            }}
            errorMessage={brandInfoInputErrors.email}
          />
          <Text style={[styles.instruction_text, { marginTop: 0 }]}>
            Brand with Logo are most likely to be visited by customers. Make sure the uploaded logo
            has a a 1:1 image ratio.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of your Brand Logo (1:1)"
            onPhotoActionPress={() => setIsLogoModalVisible(true)}
            imageURI={brandInfoInput.logoImage.uri}
            onDeletePress={() => handleBrandInfoChanged('logoImage', '')}
            errorMessage={brandInfoInputErrors.logoImage}
          />
          <Text style={[styles.instruction_text, { marginTop: 0 }]}>
            Wallpaper makes your Brand menu screen better. Make sure the uploaded wallpaper has a
            3:2 image ratio.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of your Brand Wallpaper (3:2)"
            onPhotoActionPress={() => setIsWallpaperModalVisible(true)}
            imageURI={brandInfoInput.wallpaperImage.uri}
            onDeletePress={() => handleBrandInfoChanged('wallpaperImage', '')}
            errorMessage={brandInfoInputErrors.wallpaperImage}
          />
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: COLOR.background_color,
              width: 'auto',
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                tintColors={{ true: COLOR.indicator_current_color, false: COLOR.background_color }} //This only support Android, for iOS, view this link: https://github.com/react-native-checkbox/react-native-checkbox
                value={toggleCheckbox}
                onValueChange={(newValue) => setToggleCheckbox(newValue)}
              />
              {!toggleCheckbox && (
                <Text style={styles.errorMessage_text}>
                  *Confirm this checkbox before submitting.
                </Text>
              )}
            </View>
            <Text style={styles.policy_text}>
              I have read and agree to Foodey's Store Privacy Policy.
            </Text>
          </View>
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
            title={'Create Brand'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={() => onCreatePress()}
            disabled={!toggleCheckbox}
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

  errorMessage_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: COLOR.text_errorMessage_color,
    marginStart: 10,
    marginBottom: 3,
  },
});

export default BrandCreationScreen;
