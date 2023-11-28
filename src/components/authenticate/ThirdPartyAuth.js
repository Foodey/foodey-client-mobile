import { View, Text, Pressable, StyleSheet } from 'react-native';
import GoggleIcon from '~/resources/icons/google-icon.svg';
import AppleIcon from '~/resources/icons/apple-icon.svg';
import FacebookIcon from '~/resources/icons/facebook-icon.svg';
import { COLOR } from '~/constants/Colors';

function ThirdPartyAuth(props) {
  return (
    <View style={[{ ...props.style }]}>
      <View style={styles.split_container}>
        <View>
          <Text style={styles.split_text}>Or {props.title} using: </Text>
        </View>
        <View style={[styles.split_line, { ...props.lineStyle }]} />
      </View>
      <View style={styles.third_party_container}>
        <Pressable
          onPress={props.onGoogleSelect}
          style={({ pressed }) => [
            styles.circle,
            { backgroundColor: pressed ? COLOR.indicator_color : COLOR.background_color },
          ]}
        >
          <GoggleIcon />
        </Pressable>
        <Pressable
          onPress={props.onAppleSelect}
          style={({ pressed }) => [
            styles.circle,
            { backgroundColor: pressed ? COLOR.indicator_color : COLOR.background_color },
          ]}
        >
          <AppleIcon />
        </Pressable>
        <Pressable
          onPress={props.onFacebookSelect}
          style={({ pressed }) => [
            styles.circle,
            { backgroundColor: pressed ? COLOR.indicator_color : COLOR.background_color },
          ]}
        >
          <FacebookIcon />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  split_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 21,
    marginTop: 35,
  },

  split_text: {
    width: 130,
    textAlign: 'left',
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 17,
  },

  split_line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },

  third_party_container: {
    margin: 21,
    flexDirection: 'row',
  },

  circle: {
    borderWidth: 1.5,
    borderColor: COLOR.indicator_color,
    alignItems: 'center',
    justifyContent: 'center',
    width: 71,
    height: 71,
    borderRadius: 100,
    backgroundColor: COLOR.background_color,
    marginEnd: 10,
  },
});

export default ThirdPartyAuth;
