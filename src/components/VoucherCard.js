import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import ArrowRight from '~/resources/icons/arrow-right.svg';
import { SelectedButton } from '~/components';

function VoucherCard({
  style,
  imageURL,
  code,
  method,
  quantity,
  discountAmount,
  minimumToApply,
  expiredDate,
  onPressFunction,
  isIconVisible,
}) {
  function calculateTimeTillExpired(value) {
    try {
      const currentDateTime = new Date();
      const currentYear = currentDateTime.getFullYear();
      const currentMonth = currentDateTime.getMonth() + 1; // Add leading zero if needed
      const currentDay = currentDateTime.getDate();
      const currentHours = currentDateTime.getHours();
      const currentMinutes = currentDateTime.getMinutes();

      const expiredDateTime = new Date(value);
      const expiredYear = expiredDateTime.getUTCFullYear();
      const expiredMonth = expiredDateTime.getUTCMonth() + 1; // Add leading zero if needed
      const expiredDay = expiredDateTime.getUTCDate();
      const expiredHours = expiredDateTime.getUTCHours();
      const expiredMinutes = expiredDateTime.getUTCMinutes();

      if (currentYear !== expiredYear) {
        const result = expiredYear - currentYear;
        if (result >= 0 && result === 1) {
          return `${expiredYear - currentYear} year`;
        }
        return `${expiredYear - currentYear} years`;
      } else {
        if (currentMonth !== expiredMonth) {
          const result = expiredMonth - currentMonth;
          if (result >= 0 && result === 1) {
            return `${expiredMonth - currentMonth} month`;
          }
          return `${expiredMonth - currentMonth} months`;
        } else {
          if (currentDay !== expiredDay) {
            const result = expiredDay - currentDay;
            if (result >= 0 && result === 1) {
              return `${expiredDay - currentDay} day`;
            }
            return `${expiredDay - currentDay} days`;
          } else {
            if (currentHours !== expiredHours) {
              const result = expiredHours - currentHours;
              if (result >= 0 && result === 1) {
                return `${expiredHours - currentHours} hour`;
              }
              return `${expiredHours - currentHours} hours`;
            } else {
              if (currentMinutes !== expiredMinutes) {
                const result = expiredMinutes - currentMinutes;
                if (result >= 0 && result === 1) {
                  return `${expiredMinutes - currentMinutes} minute`;
                }
                return `${expiredMinutes - currentMinutes} minutes`;
              }
            }
          }
        }
      }
    } catch (err) {
      console.log('Error when calculating time until voucher expired: ' + err);
      return null;
    }
  }

  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
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
        <Text style={styles.voucher_text}>Enter "{code}": </Text>
        {method === 'SPECIAL_AMOUNT' ? (
          <Text style={styles.voucher_text}>200k discount</Text>
        ) : (
          <Text style={styles.voucher_text}>20% off discount</Text>
        )}
        <Text style={styles.minimum_text}>Minimum order of {minimumToApply}k</Text>
        <Text style={styles.expiration_text}>
          Expired in: {calculateTimeTillExpired(expiredDate)}
        </Text>
      </View>
      <View style={styles.action_container}>
        {isIconVisible && (
          <ArrowRight width={25} height={25} style={{ color: COLOR.text_primary_color }} />
        )}
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
