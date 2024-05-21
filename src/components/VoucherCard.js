import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import ArrowRight from '~/resources/icons/arrow-right.svg';
import { SelectedButton } from '~/components';

function VoucherCard({
  imageURL,
  name,
  percentages,
  maximum,
  minimumToApply,
  expireTime,
  onPressFunction,
}) {
  return (
    <Pressable style={styles.container} onPress={onPressFunction}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
        <Image
          style={styles.voucher_image}
          source={require('../resources/images/Foodey-LOGO.png')}
        />
        {/* <Image
          source={{ uri: imageURL || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
          style={styles.voucher_image}
        /> */}
      </View>
      <View style={styles.content_container}>
        <Text style={styles.voucher_text}>Enter "{name}": </Text>
        {percentages === '' ? (
          <Text style={styles.voucher_text}>Maximum of {maximum}k</Text>
        ) : (
          <Text style={styles.voucher_text}>
            {percentages}% off, maximum {maximum}k
          </Text>
        )}
        <Text style={styles.minimum_text}>Minimum order of {minimumToApply}k</Text>
        <Text style={styles.expiration_text}>Expired in: {expireTime} hours</Text>
      </View>
      <View style={styles.action_container}>
        <ArrowRight width={25} height={25} style={{ color: COLOR.text_primary_color }} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR.indicator_color,
    marginVertical: 5,
  },

  voucher_image: {
    // flex: 2,
    // resizeMode: 'contain',
    width: 80,
    height: 80,
    justifyContent: 'center',
  },

  content_container: {
    flex: 4,
    // backgroundColor: '#f0f',
    justifyContent: 'center',
  },

  action_container: {
    flex: 1,
    // backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  voucher_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 17,
    color: COLOR.text_primary_color,
  },

  minimum_text: {
    fontFamily: 'Manrope-Medium',
    marginTop: 5,
    fontSize: 13,
    color: COLOR.text_secondary_color,
  },

  expiration_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: COLOR.indicator_current_color,
  },
});

export default VoucherCard;
