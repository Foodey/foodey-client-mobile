import { ScrollView, Text, Pressable, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { InputBox, PasswordBox, PhoneNumberBox } from '~/components/authenticate';

function SignUp(props) {
  const [inputs, setInputs] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputsChanged = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleErrorsChanged = (text, input) => {
    setErrorMessages((prevState) => ({ ...prevState, [input]: text }));
  };

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
