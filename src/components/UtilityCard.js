import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

function UtilityCard(props) {
  return (
    <View style={props.style}>
      <Text style={[styles.title_text, { ...props.title_style }]}>{props.title}</Text>
      <Text style={[styles.content_text, { ...props.content_style }]}>{props.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title_text: {
    fontSize: 34,
    fontWeight: '500',
    fontFamily: 'Manrope-Bold',
    color: COLOR.text_primary_color,
    marginBottom: 13,
  },

  content_text: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_secondary_color,
  },
});

export default UtilityCard;
