import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox } from '~/components/authenticate';

function SignUp(props) {
  return (
    <View style={{ flex: 1 }}>
      <InputBox
        title="Email"
        errorMessage="The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <InputBox
        title="Email"
        errorMessage="The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <InputBox
        title="Email"
        errorMessage="The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <PasswordBox
        title="Password"
        errorMessage="The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
