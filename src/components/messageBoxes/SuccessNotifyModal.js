import { View, Text, StyleSheet, Modal } from 'react-native';
import React from 'react';
import { SubmitButton } from '~/components';
import { COLOR } from '~/constants/Colors';
import { PhoneNumberBox } from '../authenticate';
import { useState } from 'react';

function SuccessNotifyModal(props) {
  return (
    <Modal transparent={true} transition="fade" visible={props.visible}>
      <View style={styles.overlay_background} />
      <View style={styles.wrapped_container}>
        <View style={styles.modal_container}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{props.title}</Text>
          </View>
          <View style={styles.actions_container}>
            <SubmitButton
              title="OK"
              showIcon={false}
              style={{ flex: 1, marginBottom: 28, marginHorizontal: 100, marginTop: 10 }}
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
    height: 180,
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
    fontSize: 23,
    color: COLOR.text_primary_color,
  },

  actions_container: {
    flex: 1,
  },
});

export default SuccessNotifyModal;
