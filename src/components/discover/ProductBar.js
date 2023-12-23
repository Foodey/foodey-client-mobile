import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Star } from '~/resources/icons';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function ProductBar({ style, image, name, price, afterDiscountPrice, onPressFunction }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPressFunction}>
      <View style={styles.content_container}>
        <Image source={image} style={styles.image} />
        <View style={styles.res_info_container}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                styles.price_text,
                { textDecorationLine: afterDiscountPrice !== '' ? 'line-through' : 'none' },
              ]}
            >
              {price}đ
            </Text>
            {afterDiscountPrice !== '' && (
              <Text style={styles.discount_price_text}>{afterDiscountPrice}đ</Text>
            )}
          </View>
        </View>
        <ArrowRight
          width={24}
          height={24}
          style={{ color: COLOR.text_primary_color, marginStart: 21 }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.indicator_color,
    justifyContent: 'center',
  },

  content_container: {
    flexDirection: 'row',
    marginHorizontal: 21,
    alignItems: 'center',
  },

  image: {
    width: 120,
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

  price_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    marginStart: 5,
    marginEnd: 10,
    color: COLOR.text_blue_color,
  },

  discount_price_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    marginStart: 5,
    color: COLOR.button_primary_color,
  },
});

export default ProductBar;
