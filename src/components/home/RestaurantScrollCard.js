import { View, StyleSheet, Text, Image } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Location, Search } from '~/resources/icons';

function RestaurantScrollCard({ style, wallpaperLink, logoLink, name, distance }) {
  return (
    <View style={[styles.container, style]}>
      <Image source={wallpaperLink} style={styles.wallpaper}></Image>
      <View style={styles.content_container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={logoLink} style={styles.logo} />
        </View>
        <View style={styles.res_info_container}>
          <Text style={styles.name_text}>{name}</Text>
          <Text style={styles.distance_text}>{distance} km</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 230,
    height: 155,
  },

  wallpaper: {
    width: '100%',
    height: '72%',
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
    width: '100%',
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

export default RestaurantScrollCard;
