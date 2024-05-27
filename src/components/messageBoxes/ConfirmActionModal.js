import { View, Text, StyleSheet, Modal } from 'react-native';
import React from 'react';
import { SubmitButton } from '~/components';
import { COLOR } from '../../constants/Colors';
import { PhoneNumberBox } from '../authenticate';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';

function ConfirmActionModal({
  visible,
  onClose,
  title,
  content,
  onEditPhoneNumCancelPress,
  onEditPhoneNumOKPress,
}) {
  return (
    <Modal transparent={true} transition="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay_background} />
      <View style={styles.wrapped_container}>
        <View style={styles.modal_container}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{title}</Text>
          </View>
          {/* <PhoneNumberBox
            value={props.newPhoneNumber}
            errorMessage={props.errorMessage}
            style={{ flex: 1, marginHorizontal: 25 }}
            onChangeText={props.onPhoneNumberTextChange}
          /> */}
          <View style={styles.content_container}>
            <Text style={styles.content_text}>{content}</Text>
          </View>
          <View style={styles.actions_container}>
            <SubmitButton
              onPressFunction={onEditPhoneNumCancelPress}
              showIcon={false}
              title="Cancel"
              style={{ flex: 1, marginEnd: 8, marginVertical: 20 }}
              buttonColor={COLOR.button_secondary_color}
              hoverColor={COLOR.button_press_secondary_color}
            />
            <SubmitButton
              onPressFunction={onEditPhoneNumOKPress}
              title="OK"
              showIcon={false}
              style={{ flex: 1, marginStart: 8, marginVertical: 20 }}
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
    width: 320,
    height: 230,
    backgroundColor: COLOR.background_color,
    borderRadius: 20,
  },

  title_container: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#0f0',
  },

  title_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 30,
    color: COLOR.msgBox_title_text,
    textAlign: 'center',
    marginTop: 10,
  },

  content_container: {
    flex: 1.25,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ff0',
  },

  content_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 22,
    color: COLOR.text_primary_color,
    textAlign: 'center',
  },

  actions_container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 25,
  },
});

export default ConfirmActionModal;
