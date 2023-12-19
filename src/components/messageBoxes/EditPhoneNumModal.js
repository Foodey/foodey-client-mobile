import { View, Text, StyleSheet, Modal } from 'react-native';
import React from 'react';
import { SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import { PhoneNumberBox } from '../authenticate';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';

function EditPhoneNumModal(props) {
  return (
    <Modal
      transparent={true}
      transition="fade"
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={styles.overlay_background} />
      <View style={styles.wrapped_container}>
        <View style={styles.modal_container}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>Edit Phone Number</Text>
          </View>
          <PhoneNumberBox
            value={props.newPhoneNumber}
            errorMessage={props.errorMessage}
            style={{ flex: 1, marginHorizontal: 25 }}
            onChangeText={props.onPhoneNumberTextChange}
          />
          <View style={styles.actions_container}>
            <SubmitButton
              onPressFunction={props.onEditPhoneNumCancelPress}
              showIcon={false}
              title="Cancel"
              style={{ flex: 1, marginEnd: 8, marginVertical: 25 }}
              buttonColor={COLOR.button_secondary_color}
              hoverColor={COLOR.button_press_secondary_color}
            />
            <SubmitButton
              onPressFunction={props.onEditPhoneNumOKPress}
              title="OK"
              showIcon={false}
              style={{ flex: 1, marginStart: 8, marginVertical: 25 }}
              buttonColor={COLOR.button_primary_color}
              hoverColor={COLOR.button_press_primary_color}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay_background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  wrapped_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  modal_container: {
    width: 350,
    height: 320,
    backgroundColor: COLOR.background_color,
    borderRadius: 20,
  },

  title_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 30,
    color: COLOR.text_primary_color,
    textAlign: 'center',
  },

  actions_container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 25,
  },
});

export default EditPhoneNumModal;
