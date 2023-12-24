import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Star } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function RestaurantBar({ style, image, name, distance, estimateTime, rating, onPressFunction }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <View style={styles.content_container}>
        <Image
          source={{ uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
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
        <ArrowRight width={24} height={24} style={{ color: COLOR.text_primary_color }} />
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
    fontSize: 14,
    marginStart: 5,
  },
});

export default RestaurantBar;
