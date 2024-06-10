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
    // console.log('Back press');
    navigation.pop();
  };

  const onNextPress = () => {
    //verify inputs logic
    navigation.navigate('RequestSentNoti_Screen');
  };

  const [toggleCheckbox, setToggleCheckbox] = useState(false);

  const [isFrontModalVisible, setIsFrontModalVisible] = useState(false);
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);

  const [selectedFrontPhotoURI, setSelectedFrontPhotoURI] = useState('');
  const [selectedBackPhotoURI, setSelectedBackPhotoURI] = useState('');

  const onFrontPhotoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        setSelectedFrontPhotoURI(result.assets[0].uri);
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
        setSelectedBackPhotoURI(result.assets[0].uri);
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
        setSelectedFrontPhotoURI(result.assets[0].uri);
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
        setSelectedBackPhotoURI(result.assets[0].uri);
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
            information provided will be kept confidential
          </Text>
          <ShortInputField
            title="Citizen identification number"
            placeholder="Enter"
            isRequired={false}
            keyboardType="numeric"
          />
          <ShortInputField title="Full Name" placeholder="Enter" isRequired={false} />
          <Text style={styles.instruction_text}>Citizen Identification Card Photos</Text>
          <ImageInput
            style={{}}
            title="Photo of the front of your Citizen Identification card"
            isRequired={true}
            imageURI={selectedFrontPhotoURI}
            onPhotoActionPress={() => setIsFrontModalVisible(true)}
            onDeletePress={() => setSelectedFrontPhotoURI('')}
          />
          <Text style={styles.instruction_text}>
            Please provide close-up photo of the front of your Citizen Identification card. The
            information in the front of the Citizen Identification card must be clearly shown.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of the back of your Citizen Identification card"
            isRequired={true}
            imageURI={selectedBackPhotoURI}
            onPhotoActionPress={() => setIsBackModalVisible(true)}
            onDeletePress={() => setSelectedBackPhotoURI('')}
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
            <Checkbox
              tintColors={{ true: COLOR.indicator_current_color, false: COLOR.background_color }} //This only support Android, for iOS, view this link: https://github.com/react-native-checkbox/react-native-checkbox
              value={toggleCheckbox}
              onValueChange={(newValue) => setToggleCheckbox(newValue)}
            />
            <Text style={styles.policy_text}>
              I confirm all data provided is true and correct. I have read and agree to Foodey's
              Privacy Policy.
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
            title={'Back'}
            buttonColor={COLOR.button_red_color}
            hoverColor={COLOR.button_press_red_color}
            onPressFunction={() => navigation.goBack()}
          />
          <SubmitButton
            style={{ flex: 1, marginStart: 10 }}
            title={'Next'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={onNextPress}
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

  step_indicator: {
    //separator
    separatorFinishedColor: COLOR.text_blue_color,
    separatorUnFinishedColor: COLOR.text_press_color,
    //Step
    stepStrokeCurrentColor: COLOR.text_blue_color,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLOR.text_blue_color,
    stepStrokeUnFinishedColor: COLOR.text_press_color,
    stepIndicatorFinishedColor: COLOR.text_blue_color,
    stepIndicatorUnFinishedColor: COLOR.background_color,
    stepIndicatorCurrentColor: COLOR.background_color,
    //label
    stepIndicatorLabelCurrentColor: COLOR.text_blue_color,
    stepIndicatorLabelFinishedColor: COLOR.background_color,
    stepIndicatorLabelUnFinishedColor: COLOR.text_press_color,

    labelSize: 14,
    labelFontFamily: 'Manrope-Medium',
    currentStepLabelColor: COLOR.text_primary_color,
    labelColor: COLOR.text_primary_color,
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

export default SellerIdentificationScreen;
