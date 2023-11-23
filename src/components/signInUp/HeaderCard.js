import { View, Text } from 'react-native';
import Style from '~/styles/SignInUpStyle';

const HeaderCard = (props) => {
  return (
    <View style={Style.info_container}>
      <Text style={Style.header_title_text}>{props.title}</Text>
      <Text style={Style.header_info_text}>{props.content}</Text>
    </View>
  );
};

export default HeaderCard;
