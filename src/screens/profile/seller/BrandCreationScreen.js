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

const BrandCreationScreen = ({ navigation }) => {
  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onSelectAddressPress = () => {
    //
  };

  const onCreatePress = () => {
    //verify inputs logic
  };

  const [toggleCheckbox, setToggleCheckbox] = useState(false);

  const [isLogoModalVisible, setIsLogoModalVisible] = useState(false);
  const [isWallpaperModalVisible, setIsWallpaperModalVisible] = useState(false);

  const [selectedLogoURI, setSelectedLogoURI] = useState('');
  const [selectedWallpaperURI, setSelectedWallpaperURI] = useState('');

  const onLogoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        setSelectedLogoURI(result.assets[0].uri);
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
        setSelectedWallpaperURI(result.assets[0].uri);
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
        // console.log(result.assets[0].uri);
        setSelectedLogoURI(result.assets[0].uri);
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
        // console.log(result.assets[0].uri);
        setSelectedWallpaperURI(result.assets[0].uri);
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
          <ShortInputField title="Brand Name" placeholder="Enter Brand Name" isRequired={true} />
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
          />
          <ShortInputField title="Email" placeholder="Enter Your Email" isRequired={true} />
          <Text style={styles.instruction_text}>Brand Photos</Text>
          <ImageInput
            style={{}}
            title="Photo of your Brand Logo (1:1)"
            imageURI={selectedLogoURI}
            onPhotoActionPress={() => setIsLogoModalVisible(true)}
            onDeletePress={() => setSelectedLogoURI('')}
          />
          <Text style={styles.instruction_text}>
            Brand with Logo are most likely to be visited by customers. Make sure the uploaded logo
            has a a 1:1 image ratio.
          </Text>
          <ImageInput
            style={{}}
            title="Photo of your Brand Wallpaper (3:2)"
            imageURI={selectedWallpaperURI}
            onPhotoActionPress={() => setIsWallpaperModalVisible(true)}
            onDeletePress={() => setSelectedWallpaperURI('')}
          />
          <Text style={styles.instruction_text}>
            Wallpaper makes your Brand menu screen better. Make sure the uploaded wallpaper has a
            3:2 image ratio.
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
            // onPressFunction={onCreatePress}
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

export default BrandCreationScreen;
