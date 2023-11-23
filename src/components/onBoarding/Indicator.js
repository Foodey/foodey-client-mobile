import { View } from 'react-native';
import Style from '~/screens/onBoarding/OnBoardingStyle';

function Indicator(props) {
  return (
    <View style={{ flexDirection: 'row', marginLeft: 31 }}>
      <View style={[Style.circle, { ...props.styleFirstPage }]} />
      <View style={[Style.circle, { ...props.styleSecondPage }]} />
      <View style={[Style.circle, { ...props.styleThirdPage }]} />
    </View>
  );
}

export default Indicator;
