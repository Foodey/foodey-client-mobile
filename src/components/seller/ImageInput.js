import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { Add } from '../../resources/icons';

function ImageInput({
  style,
  title,
  isRequired,
  exampleImageURI,
  imageURI,
  onPhotoActionPress,
  errorMessage,
  onDeletePress,
}) {
  return (
    <View style={style}>
      <View style={[styles.container]}>
        <Text style={styles.title_text}>
          {title} {isRequired && <Text style={{ color: COLOR.text_errorMessage_color }}>*</Text>}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
          {!imageURI ? (
            <Pressable style={styles.choose_image_button} onPress={onPhotoActionPress}>
              <Add width={32} height={32} color={COLOR.text_press_color} />
            </Pressable>
          ) : (
            <Image style={styles.IC_card_image} source={{ uri: imageURI }} />
          )}
          <Image
            style={{ height: 60, width: 100, marginStart: 20, alignSelf: 'flex-end' }}
            source={require('../../resources/images/Foodey-LOGO.png')}
          />
          {imageURI && (
            <Pressable
              style={{ marginStart: 'auto', justifyContent: 'flex-end' }}
              onPress={onDeletePress}
            >
              <Text style={styles.delete_text}>Delete Image</Text>
            </Pressable>
          )}
        </View>
      </View>
      {errorMessage && (
        <View style={styles.errorMessage_container}>
          <Text style={styles.errorMessage_text}>* {errorMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    paddingHorizontal: 15,
  },

  title_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16.5,
    color: COLOR.text_primary_color,
    marginVertical: 10,
  },

  IC_card_image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },

  choose_image_button: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: COLOR.text_press_color,
    borderStyle: 'dashed',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  delete_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    textDecorationLine: 'underline',
    color: COLOR.text_errorMessage_color,
  },

  errorMessage_container: {
    backgroundColor: COLOR.errorMessage_background_Color,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
  },

  errorMessage_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: COLOR.text_errorMessage_color,
  },
});

export default ImageInput;
