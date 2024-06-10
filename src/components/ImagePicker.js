import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

const ImgPicker = () => {
  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  };
  return <View>...</View>;
};

export default ImgPicker;
