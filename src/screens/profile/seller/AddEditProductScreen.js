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
import React, { useState, useLayoutEffect } from 'react';
import { COLOR } from '../../../constants/Colors';
import {
  IntroHeader,
  ShortInputField,
  ImageInput,
  PressableInputField,
} from '../../../components/seller';
import { SubmitButton } from '../../../components';
import { PhotoSelectionModal } from '../../../components/messageBoxes';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CategorySelectionModal } from '../../../components/messageBoxes';
import { getCategoriesAPI } from '../../../apiServices/HomeService';
import HTTPStatus from '../../../constants/HTTPStatusCodes';

const AddEditProductScreen = ({ navigation, route }) => {
  const isEdit = false; //Control if the screen is Edit or Add Product Screen

  useLayoutEffect(() => {
    const getCategoriesFunction = async () => {
      try {
        const response = await getCategoriesAPI();
        if (response.status === HTTPStatus.OK) {
          setCategoryList(response.data.content);
        } else {
          console.log('Unexpected error when fetching categories');
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCategoriesFunction();
  }, []);

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const onCancelPress = () => {
    //
  };

  const onSavePress = () => {
    //
  };

  const [isCategorySelectVisible, setIsCategorySelectVisible] = useState(false);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const [selectedPhotoURI, setSelectedPhotoURI] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    categoryID: '',
    categoryName: '',
  });

  const onCategorySelected = (category) => {
    setSelectedCategory(category);
    setIsCategorySelectVisible(false);
  };

  const onPhotoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        setSelectedPhotoURI(result.assets[0].uri);
        setIsPhotoModalVisible(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log('Camera permission denied ' + err);
    }
  };

  const onPhotoOpenLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        // console.log(result.assets[0].uri);
        setSelectedPhotoURI(result.assets[0].uri);
        setIsPhotoModalVisible(false);
      } else {
        console.log('Library permission denied');
      }
    } catch (err) {
      console.log('Library permission denied ' + err);
    }
  };

  const onCategoryModalClose = () => {
    setIsCategorySelectVisible(false);
  };

  const onOpenCategoryModalPress = () => {
    setIsCategorySelectVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={
          isPhotoModalVisible || isCategorySelectVisible
            ? 'rgba(0, 0, 0, 0.35)'
            : COLOR.background_color
        }
      />
      <CategorySelectionModal
        isVisible={isCategorySelectVisible}
        categoryList={categoryList}
        onBackdropPress={onCategoryModalClose}
        onClosePress={onCategoryModalClose}
        onCategorySelected={onCategorySelected}
      />
      <PhotoSelectionModal
        isVisible={isPhotoModalVisible}
        backdropPress={() => setIsPhotoModalVisible(false)}
        openCameraPress={() => onPhotoOpenCamera()}
        openLibraryPress={() => onPhotoOpenLibrary()}
      />
      <IntroHeader
        style={{ backgroundColor: COLOR.background_color }}
        onLeftButtonPress={onGoBackPress}
        title={isEdit ? 'Edit Product' : 'Add Product'}
      />
      <View style={{ flex: 1 }}>
        {/*content container */}
        <ScrollView style={{ height: '80%', marginTop: 10 }} showsVerticalScrollIndicator={false}>
          <ImageInput
            style={{}}
            title="Photo of your Product"
            isRequired={false}
            imageURI={selectedPhotoURI}
            onPhotoActionPress={() => setIsPhotoModalVisible(true)}
            onDeletePress={() => setSelectedPhotoURI('')}
          />
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
            Product with good and attractive photo would likely got ordered by the customer. Make
            sure the uploaded photo has a a 1:1 image ratio.
          </Text>
          <ShortInputField title="Name" placeholder="Enter Product Name" isRequired={true} />
          <ShortInputField
            title="Description"
            placeholder="Enter Product Description"
            isRequired={false}
          />
          <ShortInputField
            title="Price"
            placeholder="ex: 200000"
            isRequired={true}
            keyboardType="numeric"
          />
          <Text style={styles.instruction_text}>
            Make sure not to include splitting characters like ',' or '.' for Product Price.
          </Text>
          <PressableInputField
            title="Product Category"
            isRequired={true}
            onPressFunction={onOpenCategoryModalPress}
            value={selectedCategory?.categoryName}
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
          {isEdit && (
            <SubmitButton
              style={{ flex: 1, marginEnd: 10 }}
              title={'Cancel Order'}
              buttonColor={COLOR.button_red_color}
              hoverColor={COLOR.button_press_red_color}
              // onPressFunction={onCancelPress}
            />
          )}
          <SubmitButton
            style={{ flex: 1 }}
            title={isEdit ? 'Save' : 'Add'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            // onPressFunction={onSavePress}
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

export default AddEditProductScreen;
