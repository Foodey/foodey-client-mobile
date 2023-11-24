import { View, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

function Indicator(props) {
  return (
    <View style={{ flexDirection: 'row', marginLeft: 31 }}>
      <View style={[styles.circle, { ...props.styleFirstPage }]} />
      <View style={[styles.circle, { ...props.styleSecondPage }]} />
      <View style={[styles.circle, { ...props.styleThirdPage }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: COLOR.indicator_color,
    margin: 2.5,
  },
});

export default Indicator;
