import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList, Image } from 'react-native';
import { COLOR } from '../../constants/Colors';
import { CloseCircle } from '../../resources/icons';
import { CircleCategory } from '../home';

function CategorySelectionModal({
  style,
  isVisible,
  onBackdropPress,
  categoryList,
  selectedCategoryID,
  onClosePress,
  onCategorySelected,
}) {
  const categorySelected = (item) => {
    onCategorySelected({ categoryID: item?.id, categoryName: item?.name });
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <Pressable style={styles.overlay_background} onPress={onBackdropPress} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[styles.container, style]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.header_text}>Select Product Category</Text>
            <Pressable onPress={onClosePress} style={{ marginStart: 'auto', marginBottom: 5 }}>
              <CloseCircle width={43} height={43} />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: COLOR.text_press_color,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}
              style={{}}
              data={categoryList}
              numColumns={2}
              renderItem={({ item }) => (
                <CircleCategory
                  style={{ marginVertical: 5, marginHorizontal: 20 }}
                  imageStyle={{ width: 50, height: 50 }}
                  imageLink={item.image}
                  title={item.name}
                  onPressFunction={() => categorySelected(item)}
                />
              )}
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

  container: {
    backgroundColor: COLOR.background_color,
    borderRadius: 30,
    padding: 15,
    width: 380,
    height: 600,
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_primary_color,
  },

  text_input_container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.text_press_color,
    paddingHorizontal: 5,
    marginTop: 5,
    padding: 10,
  },

  header_text: {
    fontFamily: 'Manrope-SemiBold',
    color: COLOR.text_primary_color,
    fontSize: 24,
    marginTop: 2,
  },

  note_text: {
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_primary_color,
    fontSize: 20,
    height: '95%',
  },
});

export default CategorySelectionModal;
