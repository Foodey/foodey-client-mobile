import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Star, Heart } from '~/resources/icons';

function FavoriteMealBar({ style, name, image, restaurantLogo, restaurantName, onPressFunction }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <View style={styles.content_container}>
        <Image
          //   source={{ uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
          source={image}
          style={styles.image}
        />
        <View style={styles.res_info_container}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              //   source={{ uri: image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
              source={restaurantLogo}
              style={styles.logo}
            />
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.resName_text}>
              {restaurantName}
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

  name_text: {
    fontFamily: 'Manrope-Medium',
    color: COLOR.text_primary_color,
    fontSize: 18.5,
  },

  image: {
    width: 40,
    height: 40,
    marginEnd: 15,
  },

  logo: {
    width: 22,
    height: 22,
  },

  res_info_container: {
    flex: 1,
    justifyContent: 'center',
  },

  resName_text: {
    fontFamily: 'Manrope-Medium',
    color: COLOR.text_secondary_color,
    fontSize: 15,
    marginStart: 5,
  },
});

export default FavoriteMealBar;
