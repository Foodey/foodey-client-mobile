import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList } from 'react-native';
import { COLOR } from '../../constants/Colors';

function PhotoSelectionModal({
  style,
  isVisible,
  backdropPress,
  openCameraPress,
  openLibraryPress,
}) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onBackdropPress={backdropPress}
      transparent={true}
    >
      <Pressable style={[styles.overlay_background, style]} onPress={backdropPress} />
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={openCameraPress}>
          <Text style={styles.text}>Open Camera...</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={openLibraryPress}>
          <Text style={styles.text}>Choose from Library...</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay_background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  container: {
    backgroundColor: COLOR.background_color,
    marginTop: 'auto',
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_primary_color,
  },

  text: {
    fontFamily: 'Manrope-Medium',
    color: COLOR.text_primary_color,
    fontSize: 20,
  },
});

export default PhotoSelectionModal;
