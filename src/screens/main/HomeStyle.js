import { StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background_color,
  },

  header: {
    height: 47,
    marginHorizontal: 21,
    marginBottom: 15,
    marginTop: 2,
  },

  screen_title_text: {
    fontFamily: 'Manrope-Medium',
    fontWeight: '400',
    fontSize: 33,
    color: COLOR.text_primary_color,
    marginBottom: 6,
  },

  search_bar: {
    height: 50,
    marginHorizontal: 21,
    marginBottom: 15,
  },
});
