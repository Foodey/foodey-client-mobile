import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Star, Heart } from '~/resources/icons';

function FavoriteRestaurantBar({
  style,
  logo,
  name,
  distance,
  estimateTime,
  rating,
  onPressFunction,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <View style={styles.content_container}>
        <Image
          //   source={{ uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
          source={logo}
          style={styles.logo}
        />
        <View style={styles.res_info_container}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Star width={17} height={17} style={{ color: COLOR.star_background_color }} />
            <Text style={styles.distance_text}>
              {rating} {'  '} | {distance} km | {'  '} {estimateTime} mins
            </Text>
          </View>
        </View>
        <Heart width={32} height={32} style={{ color: COLOR.isFavorite_icon_color }} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.indicator_color,
    justifyContent: 'center',
  },

  content_container: {
    flexDirection: 'row',
    marginHorizontal: 21,
    alignItems: 'center',
  },

  logo: {
    width: 40,
    height: 40,
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
    fontSize: 14,
    marginStart: 5,
  },

  favorite_button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLOR.input_background_color,
  },
});

export default FavoriteRestaurantBar;
