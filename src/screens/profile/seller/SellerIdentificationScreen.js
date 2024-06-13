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
import React, { useState } from 'react';
import { COLOR } from '../../../constants/Colors';
import { IntroHeader, ShortInputField, ImageInput } from '../../../components/seller';
import { SubmitButton } from '../../../components';
import Checkbox from 'expo-checkbox';
import { PhotoSelectionModal } from '../../../components/messageBoxes';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const SellerIdentificationScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onSubmitPress = () => {
    //verify inputs logic
    // const ciNumberRegex = '\\^d{12}$';
    let isValid = true;

    if (sellerInfoInput.ciNumber === '') {
      handleSellerInfoErrorsChanged('ciNumber', 'Please input your citizen identification number');
      isValid = false;
    }
    // else if (!sellerInfoInput.ciNumber.match(ciNumberRegex)) {
    //   handleSellerInfoErrorsChanged(
    //     'ciNumber',
    //     'Invalid citizen identification number format, please re-check',
    //   );
    //   isValid = false;
    // }

    if (sellerInfoInput.fullName === '') {
      handleSellerInfoErrorsChanged('fullName', 'Please input your full name');
      isValid = false;
    }

    if (sellerInfoInput.identifyImageFront === '') {
      handleSellerInfoErrorsChanged(
        'identifyImageFront',
        'Please provide the front side of the image',
      );
      isValid = false;
    }

    if (sellerInfoInput.identifyImageFront === '') {
      handleSellerInfoErrorsChanged(
        'identifyImageBack',
        'Please provide the back side of the image',
      );
      isValid = false;
    }

    if (isValid) {
      clearInput();
      clearErrorMessage();
      navigation.navigate('RequestSentNoti_Screen');
    }
  };

  const [toggleCheckbox, setToggleCheckbox] = useState(false);

  const [isFrontModalVisible, setIsFrontModalVisible] = useState(false);
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);

  const [sellerInfoInput, setSellerInfoInput] = useState({
    ciNumber: '',
    fullName: '',
    identifyImageFront: '',
    identifyImageBack: '',
  });

  const [sellerInfoInputErrors, setSellerInfoInputErrors] = useState({
    citizenIdentifyNumber: '',
    fullName: '',
    identifyImageFront: '',
    identifyImageBack: '',
  });

  const handleSellerInfoChanged = (field, value) => {
    setSellerInfoInput((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSellerInfoErrorsChanged = (field, errorMessage) => {
    setSellerInfoInputErrors((prevState) => ({ ...prevState, [field]: errorMessage }));
  };

  const clearErrorMessage = () => {
    setSellerInfoInputErrors({
      ciNumber: '',
      fullName: '',
      identifyImageFront: '',
      identifyImageBack: '',
    });
  };

  const clearInput = () => {
    setSellerInfoInput({
      ciNumber: '',
      fullName: '',
      identifyImageFront: '',
      identifyImageBack: '',
    });
  };

  const onFrontPhotoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        handleSellerInfoErrorsChanged('identifyImageFront', '');
        handleSellerInfoChanged('identifyImageFront', result.assets[0].uri);
        setIsFrontModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log('Camera permission denied ' + err);
    }
  };

  const onBackPhotoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        handleSellerInfoErrorsChanged('identifyImageBack', '');
        handleSellerInfoChanged('identifyImageBack', result.assets[0].uri);
        setIsBackModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log('Camera permission denied ' + err);
    }
  };

  const onFrontPhotoOpenLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        // console.log(result.assets[0].uri);
        handleSellerInfoErrorsChanged('identifyImageFront', '');
        handleSellerInfoChanged('identifyImageFront', result.assets[0].uri);
        setIsFrontModalVisible(false);
      } else {
        console.log('Library permission denied');
      }
    } catch (err) {
      console.log('Library permission denied ' + err);
    }
  };

  const onBackPhotoOpenLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        // console.log(result.assets[0].uri);
        handleSellerInfoErrorsChanged('identifyImageBack', '');
        handleSellerInfoChanged('identifyImageBack', result.assets[0].uri);
        setIsBackModalVisible(false);
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
          isFrontModalVisible || isBackModalVisible ? 'rgba(0, 0, 0, 0.35)' : COLOR.background_color
        }
      />
      <PhotoSelectionModal
        isVisible={isFrontModalVisible}
        backdropPress={() => setIsFrontModalVisible(false)}
        openCameraPress={() => onFrontPhotoOpenCamera()}
        openLibraryPress={() => onFrontPhotoOpenLibrary()}
      />
      <PhotoSelectionModal
        isVisible={isBackModalVisible}
        backdropPress={() => setIsBackModalVisible(false)}
        openCameraPress={() => onBackPhotoOpenCamera()}
        openLibraryPress={() => onBackPhotoOpenLibrary()}
      />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title="Seller Identification"
      />
      <View style={{ flex: 1 }}>
        {/*content container */}
        <ScrollView style={{ height: '80%', marginTop: 10 }} showsVerticalScrollIndicator={false}>
          <Text
            style={[
              styles.instruction_text,
              {
                fontSize: 16,
                color: COLOR.indicator_current_color,
                fontFamily: 'Manrope-Bold',
                paddingTop: 0,
              },
            ]}
          >
            To become a Foodey's Seller, please provide us the Shop Owner's citizen identification
            information for Admin to verify and approve your request. We guarantee that all
            information provided will be kept confidential.
          </Text>
          <ShortInputField
            title="Citizen identification number"
            placeholder="Enter"
            isRequired={true}
            keyboardType="numeric"
            value={sellerInfoInput.citizenIdentifyNumber}
            onChangeText={(value) => {
              handleSellerInfoErrorsChanged('ciNumber', '');
              handleSellerInfoChanged('ciNumber', value);
            }}
            errorMessage={sellerInfoInputErrors.ciNumber}
          />
          <ShortInputField
            title="Full Name"
            placeholder="Enter"
            isRequired={true}
            value={sellerInfoInput.fullName}
            onChangeText={(value) => {
              handleSellerInfoErrorsChanged('fullName', '');
              handleSellerInfoChanged('fullName', value);
            }}
            errorMessage={sellerInfoInputErrors.fullName}
          />
          <Text style={styles.instruction_text}>Citizen Identification Card Photos</Text>
          <ImageInput
            style={{}}
            title="Photo of the front of your Citizen Identification card"
            isRequired={true}
            imageURI={sellerInfoInput.identifyImageFront}
            onPhotoActionPress={() => setIsFrontModalVisible(true)}
            onDeletePress={() => handleSellerInfoChanged('identifyImageFront', '')}
            errorMessage={sellerInfoInputErrors.identifyImageFront}
          />
          <Text style={styles.instruction_text}>
            Please provide close-up photo of the front of your Citizen Identification card. The
            information in the front of the Citizen Identification card must be clearly shown.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of the back of your Citizen Identification card"
            isRequired={true}
            imageURI={sellerInfoInput.identifyImageBack}
            onPhotoActionPress={() => setIsBackModalVisible(true)}
            onDeletePress={() => handleSellerInfoChanged('identifyImageBack', '')}
            errorMessage={sellerInfoInputErrors.identifyImageBack}
          />
          <Text style={styles.instruction_text}>
            Please provide close-up photo of the back of your Citizen Identification card. The
            information in the back of the Citizen Identification card must be clearly shown.
          </Text>
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
              I confirm all data provided is true and correct. I have read and agree to Foodey
              Seller's Privacy Policy.
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
            title={'Submit'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={onSubmitPress}
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

export default SellerIdentificationScreen;
