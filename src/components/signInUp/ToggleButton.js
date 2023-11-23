import { View, Text, Pressable } from 'react-native';
import Style from '~/styles/SignInUpStyle';

const AuthToggle = (props) => {
  return (
    <Pressable style={[{ alignItems: 'center', ...props.style }]}>
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default AuthToggle;
