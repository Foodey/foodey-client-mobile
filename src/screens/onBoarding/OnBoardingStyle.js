import { StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

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

  skip_button: {
    flex: 0.75,
    marginVertical: 49,
    marginRight: 55,
  },

  next_button: {
    flex: 1.25,
    marginVertical: 49,
  },
});
