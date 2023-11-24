import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

function AuthSwitcher(props) {
  return (
    <View style={[{ ...props.style }, styles.container]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? COLOR.button_press_secondary_color
              : COLOR.button_secondary_color,
          },
          { ...props.style },
        ]}
      >
        <Text style={styles.button_text}>Login</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? COLOR.button_press_secondary_color
              : COLOR.button_secondary_color,
          },
          { ...props.style },
        ]}
      >
        <Text style={styles.button_text}>SignUp</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0',
    flexDirection: 'row',
    backgroundColor: '#fdd3e166',
    borderRadius: 50,
    margin: 21,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 25,
    marginHorizontal: 10,
  },

  button_text: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Regular',
  },
});

export default AuthSwitcher;
