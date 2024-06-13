import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList, TextInput } from 'react-native';
import { COLOR } from '../../constants/Colors';
import { CloseCircle } from '../../resources/icons';

function NoteModal({
  style,
  isVisible,
  noteValue,
  characterLimit = 100,
  editable = true,
  onClosePress,
}) {
  const [note, setNote] = useState(noteValue);
  const onChangeText = (value) => {
    setNote(value);
  };

  const onModalClose = () => {
    onClosePress(note);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      onBackdropPress={onModalClose}
      transparent={true}
    >
      <Pressable style={styles.overlay_background} onPress={onModalClose} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[styles.container, style]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.header_text}>Add Note</Text>
            <Pressable onPress={onModalClose} style={{ marginStart: 'auto', marginBottom: 5 }}>
              <CloseCircle width={43} height={43} />
            </Pressable>
          </View>
          <View style={styles.text_input_container}>
            <TextInput
              editable={editable}
              value={note}
              multiline
              placeholder="Leave a note..."
              style={styles.note_text}
              textAlignVertical="top"
              onChangeText={onChangeText}
            />
            <Text
              style={{
                marginStart: 'auto',
                fontFamily: 'Manrope-Medium',
                fontSize: 16,
                color:
                  note.length > { characterLimit }
                    ? COLOR.text_errorMessage_color
                    : COLOR.text_secondary_color,
              }}
            >
              {note.length}/{characterLimit}
            </Text>
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

  container: {
    backgroundColor: COLOR.background_color,
    borderRadius: 30,
    padding: 15,
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_primary_color,
  },

  text_input_container: {
    width: 350,
    height: 420,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.text_press_color,
    paddingHorizontal: 5,
    marginTop: 5,
  },

  header_text: {
    fontFamily: 'Manrope-SemiBold',
    color: COLOR.text_primary_color,
    fontSize: 30,
  },

  note_text: {
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_primary_color,
    fontSize: 20,
    height: '95%',
  },
});

export default NoteModal;
