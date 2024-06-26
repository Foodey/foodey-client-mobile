import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Location, Search } from '~/resources/icons';

function TruncateRestaurantCard({
  style,
  imageStyle,
  wallpaper,
  logo,
  name,
  distance,
  isLocalImage, //temp props, delete later
  onPressFunction,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <Image
        source={
          isLocalImage
            ? wallpaper
            : { uri: wallpaper || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }
        }
        style={[styles.wallpaper, imageStyle]}
      ></Image>
      <View style={styles.content_container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={
              isLocalImage
                ? logo
                : { uri: logo || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }
            }
            style={styles.logo}
          />
        </View>
        <View style={styles.res_info_container}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <Text style={styles.distance_text}>{distance} km</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 201,
  },

  wallpaper: {
    width: '100%',
    height: 150,
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
    fontSize: 17,
  },

  distance_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
  },
});

export default TruncateRestaurantCard;
