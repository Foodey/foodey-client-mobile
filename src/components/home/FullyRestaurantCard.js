import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Star } from '~/resources/icons';
import { formatDateTime } from '../../utils/ValueConverter';

function FullyRestaurantCard({
  style,
  imageStyle,
  wallpaper,
  logo,
  name,
  distance,
  estimateTime,
  avgReview,
  createdDate,
  onPressFunction,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <Image
        source={{
          uri: wallpaper || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
        }}
        style={[styles.wallpaper, imageStyle]}
      ></Image>
      <View style={styles.content_container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={{
              uri: logo || 'https://lsvn.vn/html/lsvn-web/images/no-image.png',
            }}
            style={styles.logo}
          />
        </View>
        <View style={styles.res_info_container}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {avgReview >= 0 && (
              <Star width={17} height={17} style={{ color: COLOR.star_background_color }} />
            )}
            {createdDate ? (
              <Text style={[styles.distance_text, { marginStart: 0 }]}>
                {createdDate && 'Date created: ' + formatDateTime(createdDate)}
              </Text>
            ) : (
              <Text style={[styles.distance_text, { marginStart: 2 }]}>
                {avgReview ? avgReview : ''}
                {distance && `  |  ${distance} km `}
                {estimateTime && ` |  ${estimateTime} mins`}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 348,
    height: 250,
  },

  wallpaper: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },

  content_container: {
    flexDirection: 'row',
    marginTop: 10,
  },

  logo: {
    width: 36,
    height: 36,
    marginEnd: 15,
  },

  res_info_container: {
    flex: 1,
    justifyContent: 'center',
  },

  name_text: {
    fontFamily: 'Manrope-Medium',
    color: COLOR.text_primary_color,
    fontSize: 18,
  },

  distance_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
  },
});

export default FullyRestaurantCard;
