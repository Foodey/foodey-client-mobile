import { StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_title_text: {
    fontSize: 36,
    fontWeight: '500',
    fontFamily: 'Manrope-Bold',
    color: COLOR.text_primary_color,
    marginStart: 31,
    marginEnd: 31,
  },

  header_info_text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_secondary_color,
    marginStart: 31,
    marginEnd: 31,
  },
});
