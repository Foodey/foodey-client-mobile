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
import React, { useState, useLayoutEffect, useContext } from 'react';
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
import { SellerContext } from '../../../contexts/SellerContext';
import { handleUploadImageFromDevice } from '../../../utils/Cloudinary';
import { addNewProductAPI } from '../../../apiServices/SellerService';

const AddEditProductScreen = ({ navigation, route }) => {
  const { isEdit, brandID, shopID } = route.params; //Control if the screen is Edit or Add Product Screen
  const { getProductList } = useContext(SellerContext);

  const [isCategorySelectVisible, setIsCategorySelectVisible] = useState(false);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState({
    categoryID: '',
    categoryName: '',
  });

  const [selectedCategoryErr, setSelectedCategoryErr] = useState({
    categoryID: '',
    categoryName: '',
  });

  const [productInfoInput, setProductInfoInput] = useState({
    photo: '',
    name: '',
    description: '',
    price: '',
  });

  const [productInfoInputErrors, setProductInfoInputErrors] = useState({
    photo: '',
    name: '',
    description: '',
    price: '',
  });

  const handleSelectedCategoryChanged = (field, value) => {
    setSelectedCategory((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSelectedCategoryErrorsChanged = (field, errorMessage) => {
    setSelectedCategoryErr((prevState) => ({ ...prevState, [field]: errorMessage }));
  };

  const handleProductInfoChanged = (field, value) => {
    setProductInfoInput((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleProductInfoErrorsChanged = (field, errorMessage) => {
    setProductInfoInputErrors((prevState) => ({ ...prevState, [field]: errorMessage }));
  };

  const clearInput = () => {
    setProductInfoInput({
      photo: '',
      name: '',
      description: '',
      price: '',
    });
  };

  const clearErrorMessage = () => {
    setProductInfoInputErrors({
      photo: '',
      name: '',
      description: '',
      price: '',
    });
  };

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

  const onDeletePress = () => {
    //
  };

  const onSavePress = () => {
    //
  };

  const onAddPress = async () => {
    let isValid = true;

    if (productInfoInput.name === '') {
      handleProductInfoErrorsChanged('name', 'Please input your product name');
      isValid = false;
    } else if (productInfoInput.name.length > 18) {
      handleProductInfoErrorsChanged(
        'name',
        'Shop name should be short, maximum of 18 characters only',
      );
      isValid = false;
    }

    if (productInfoInput.description === '') {
      handleProductInfoErrorsChanged('description', 'Please input your product description');
      isValid = false;
    }

    if (productInfoInput.price === '') {
      handleProductInfoErrorsChanged('price', 'Please input your product price');
      isValid = false;
    }

    if (productInfoInput.photo === '') {
      handleProductInfoErrorsChanged('photo', 'Please provide the photo of your product');
      isValid = false;
    }

    if (selectedCategory.categoryName === '') {
      handleSelectedCategoryErrorsChanged(
        'categoryName',
        'Please choose a category for your product',
      );
      isValid = false;
    }

    if (isValid) {
      const isSuccess = await addNewProduct(
        brandID,
        shopID,
        selectedCategory.categoryID,
        productInfoInput,
      );
      if (isSuccess) {
        await getProductList();
        clearInput();
        clearErrorMessage();
        navigation.navigate('SellerRestaurant_Screen');
      } else {
        handleProductInfoErrorsChanged('name', 'Unexpected error, please try again later!!');
        handleProductInfoErrorsChanged('description', 'Unexpected error, please try again later!!');
        handleProductInfoErrorsChanged('price', 'Unexpected error, please try again later!!');
        handleProductInfoErrorsChanged('photo', 'Unexpected error, please try again later!!');
        handleProductInfoErrorsChanged(
          'categoryName',
          'Unexpected error, please try again later!!',
        );
      }
    }
  };

  const addNewProduct = async (brandID, shopID, categoryID, inputs) => {
    try {
      const response = await addNewProductAPI(
        brandID,
        shopID,
        categoryID,
        inputs?.name,
        inputs?.description,
        inputs?.price,
      );
      if (response.status === HTTPStatus.CREATED) {
        await handleUploadImageFromDevice(inputs?.photo, response?.data?.logoUploadApiOptions);

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

  const onCategorySelected = (category) => {
    setSelectedCategory(category);
    handleSelectedCategoryErrorsChanged('categoryID', '');
    handleSelectedCategoryErrorsChanged('categoryName', '');
    setIsCategorySelectVisible(false);
  };

  const onPhotoOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
        handleProductInfoErrorsChanged('photo', '');
        handleProductInfoChanged('photo', result.assets[0]);
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
        handleProductInfoErrorsChanged('photo', '');
        handleProductInfoChanged('photo', result.assets[0]);
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
            imageURI={productInfoInput?.photo?.uri}
            onPhotoActionPress={() => setIsPhotoModalVisible(true)}
            onDeletePress={() => handleProductInfoChanged('photo', '')}
            errorMessage={productInfoInputErrors.photo}
          />
          <Text
            style={[
              styles.instruction_text,
              {
                fontSize: 16,
                color: COLOR.indicator_current_color,
                fontFamily: 'Manrope-Bold',
              },
            ]}
          >
            Product with good and attractive photo would likely got ordered by the customer. Make
            sure the uploaded photo has a a 1:1 image ratio.
          </Text>
          <ShortInputField
            title="Name"
            placeholder="Enter Product Name"
            isRequired={true}
            value={productInfoInput.name}
            errorMessage={productInfoInputErrors.name}
            onChangeText={(value) => {
              handleProductInfoErrorsChanged('name', '');
              handleProductInfoChanged('name', value);
            }}
          />
          <ShortInputField
            title="Description"
            placeholder="Enter Product Description"
            isRequired={false}
            value={productInfoInput.description}
            errorMessage={productInfoInputErrors.description}
            onChangeText={(value) => {
              handleProductInfoErrorsChanged('description', '');
              handleProductInfoChanged('description', value);
            }}
          />
          <ShortInputField
            title="Price"
            placeholder="ex: 200000"
            isRequired={true}
            keyboardType="numeric"
            value={productInfoInput.price}
            errorMessage={productInfoInputErrors.price}
            onChangeText={(value) => {
              handleProductInfoErrorsChanged('price', '');
              handleProductInfoChanged('price', value);
            }}
          />
          <Text style={styles.instruction_text}>
            Make sure not to include splitting characters like ',' or '.' for Product Price.
          </Text>
          <PressableInputField
            title="Product Category"
            isRequired={true}
            onPressFunction={onOpenCategoryModalPress}
            value={selectedCategory?.categoryName}
            errorMessage={selectedCategoryErr?.categoryName}
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
              title={'Delete Product'}
              buttonColor={COLOR.button_red_color}
              hoverColor={COLOR.button_press_red_color}
              onPressFunction={onDeletePress}
            />
          )}
          <SubmitButton
            style={{ flex: 1 }}
            title={isEdit ? 'Save' : 'Add'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={isEdit ? () => onSavePress() : () => onAddPress()}
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

  policy_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16.5,
    textAlign: 'justify',
    color: COLOR.indicator_current_color,
  },

  instruction_text: {
    textAlign: 'justify',
    padding: 10,
    paddingTop: 0,
    marginBottom: 10,
  },
});

export default AddEditProductScreen;
