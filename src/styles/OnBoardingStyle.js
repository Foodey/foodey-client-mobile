import { StyleSheet } from 'react-native';
import { COLOR } from '../constants/Colors';
import { Manrope } from '../constants/Others';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  info_container: {
    alignSelf: 'center',
    flex: 1.75,
  },

  footer_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1.25,
    marginStart: 21,
    marginEnd: 21,
  },

  image: {
    flex: 3,
    alignSelf: 'center',
    width: 348,
    height: 367,
    margin: 21,
    marginTop: 28,
    borderRadius: 20,
  },

  utils_title_text: {
    fontSize: 36,
    fontWeight: '500',
    fontFamily: 'Manrope-Bold',
    color: COLOR.text_primary_color,
    marginStart: 31,
    marginEnd: 31,
    marginBottom: 13,
  },

  utils_info_text: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_secondary_color,
    marginStart: 31,
    marginEnd: 31,
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: COLOR.notification_color,
    margin: 2.5,
  },

  skip_pressable: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 49,
  },

  skip_pressable_text: {
    color: COLOR.text_tertiary_color,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Times New Roman',
  },

  next_pressable: {
    flex: 1.25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 39,
    marginLeft: 40,
    borderRadius: 25,
  },

  next_pressable_text: {
    color: COLOR.background_color,
    fontSize: 18,
    fontWeight: '500',
  },
});
