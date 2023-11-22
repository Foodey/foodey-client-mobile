import { View, Text } from 'react-native';
import Style from '../../styles/OnBoardingStyle';

const UtilityCard = (props) => {
  return (
    <View style={Style.info_container}>
      <Text style={Style.utils_title_text}>{props.title}</Text>
      <Text style={Style.utils_info_text}>{props.content}</Text>
    </View>
  );
};

export default UtilityCard;
