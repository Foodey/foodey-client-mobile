import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox, PhoneNumberBox } from '~/components/authenticate';

function SignUp(props) {
  return (
    <View style={{ flex: 1 }}>
      <InputBox
        title="Full Name"
        placeholder="Enter your full name"
        errorMessage="*The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <PhoneNumberBox errorMessage="*The phone number is invalid" style={{ marginBottom: 6 }} />
      <PasswordBox
        title="Password"
        placeholder="Enter your password"
        errorMessage="*The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
      <PasswordBox
        title="Re-enter Password"
        placeholder="Re-enter your password"
        errorMessage="*The phone number is invalid"
        style={{ marginBottom: 6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
