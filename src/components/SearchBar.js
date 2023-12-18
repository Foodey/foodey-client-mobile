import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Location, Search } from '~/resources/icons';
import { useState, useEffect, useRef } from 'react';
import CloseCircle from '~/resources/icons/close-circle.svg';

function SearchBar({ style, placeholder, onDeletePress, editable, onPressFunction }) {
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef(3);

  console.log('Render Seach Bar');

  useEffect(() => {
    setTimeout(() => searchRef.current.focus(), 0);
  }, []);

  return (
    <Pressable onPress={onPressFunction} style={[styles.container, style]}>
      <Search width={24} height={24} style={{ marginStart: 12, flex: 1 }} />
      <TextInput
        ref={searchRef}
        editable={editable}
        style={[styles.location_text]}
        placeholder={placeholder}
        placeholderTextColor={COLOR.text_press_color}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (
        <Pressable style={styles.button_delete_input} onPress={onDeletePress}>
          <CloseCircle width={24} height={24} />
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.input_background_color,
    borderRadius: 12,
  },

  location_text: {
    flex: 9,
    fontFamily: 'Manrope-Regular',
    fontWeight: '400',
    fontSize: 17.5,
    color: COLOR.text_primary_color,
    marginStart: 10,
  },

  button_delete_input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 3,
  },
});

export default SearchBar;
