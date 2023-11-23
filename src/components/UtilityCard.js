import { View, Text } from 'react-native';
import Style from '~/styles/OnBoardingStyle';

const UtilityCard = (props) => {
  return (
    <View style={props.style}>
      <Text style={[Style.utils_title_text, { ...props.title_style }]}>{props.title}</Text>
      <Text style={[Style.utils_content_text, { ...props.content_style }]}>{props.content}</Text>
    </View>
  );
};

export default UtilityCard;
