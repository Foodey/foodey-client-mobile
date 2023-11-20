import { View } from 'react-native';
import Style from '../../styles/OnBoardingStyle';

const Indicator = (props) => {
  return (
    <View style={{ flexDirection: 'row', marginLeft: 31 }}>
      <View style={Style.circle} />
      <View style={Style.circle} />
      <View style={Style.circle} />
    </View>
  );
};

export default Indicator;
