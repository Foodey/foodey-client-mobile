import { StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_content_container: {
    flex: 1,
  },

  switcher_container: {
    flex: 1,
    margin: 21,
  },

  auth_section_container: {
    flex: 3,
    marginHorizontal: 21,
  },

  third_party_container: {
    flex: 2,
  },

  footer_container: {
    flex: 1,
  },
});
