import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox, PhoneNumberBox } from '~/components/authenticate';

function SignUp(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <InputBox
        title="Full Name"
        placeholder="Enter your full name"
        errorMessage=""
        style={{ marginBottom: 6 }}
      />
      <PhoneNumberBox errorMessage="" style={{ marginBottom: 6 }} />
      <PasswordBox
        title="Password"
        placeholder="Enter your password"
        errorMessage=""
        style={{ marginBottom: 6 }}
      />
      <PasswordBox
        title="Re-enter Password"
        placeholder="Re-enter your password"
        errorMessage=""
        style={{ marginBottom: 6 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
