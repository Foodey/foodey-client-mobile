import { View, StyleSheet, Text, TextInput } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Location, Search } from '~/resources/icons';

function SearchBar({ style, placeholder }) {
  return (
    <View style={[styles.container, style]}>
      <Search width={24} height={24} style={{ marginStart: 12, flex: 1 }} />
      <TextInput
        style={[styles.location_text]}
        placeholder={placeholder}
        placeholderTextColor={COLOR.text_press_color}
      />
    </View>
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
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 17.5,
    color: COLOR.indicator_current_color,
    marginStart: 10,
  },
});

export default SearchBar;
