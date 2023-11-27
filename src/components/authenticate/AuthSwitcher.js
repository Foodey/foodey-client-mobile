import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLOR } from '~/constants/Colors';

function AuthSwitcher(props) {
  return (
    <View style={[{ ...props.style }]}>
      <View style={styles.container}>
        <Pressable
          onPress={props.onLoginPress}
          style={[
            styles.button,
            {
              backgroundColor: props.isLogin
                ? COLOR.button_secondary_color
                : COLOR.switcher_background_color,
            },
            { ...props.style },
          ]}
        >
          <Text
            style={[
              styles.button_text,
              {
                color: props.isLogin ? COLOR.text_light_color : COLOR.button_secondary_color,
              },
            ]}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={props.onSignUpPress}
          style={[
            styles.button,
            {
              backgroundColor: !props.isLogin
                ? COLOR.button_secondary_color
                : COLOR.switcher_background_color,
            },
            { ...props.style },
          ]}
        >
          <Text
            style={[
              styles.button_text,
              {
                color: !props.isLogin ? COLOR.text_light_color : COLOR.button_secondary_color,
              },
            ]}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR.switcher_background_color,
    borderRadius: 40,
    marginVertical: 15,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 14,
    marginHorizontal: 10,
  },

  button_text: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_light_color,
    marginVertical: 8,
  },
});

export default AuthSwitcher;
