import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Star } from '~/resources/icons';

function FullyRestaurantCard({
  style,
  imageStyle,
  wallpaperLink,
  logoLink,
  name,
  distance,
  estimateTime,
  avgReview,
  onPressFunction,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <Image source={wallpaperLink} style={[styles.wallpaper, imageStyle]}></Image>
      <View style={styles.content_container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={logoLink} style={styles.logo} />
        </View>
        <View style={styles.res_info_container}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Star width={17} height={17} style={{ color: COLOR.star_background_color }} />
            <Text style={styles.distance_text}>
              {avgReview} | {distance} km | {estimateTime} mins
            </Text>
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
    marginStart: 5,
  },
});

export default FullyRestaurantCard;
