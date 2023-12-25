import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { ProductQuantityAdjuster } from '~/components/discover';
import ArrowRight from '~/resources/icons/arrow-right.svg';

function CartProductBar({
  style,
  image,
  name,
  addOnInfo,
  totalUnitPrice,
  quantity,
  onSubtractPress,
  onAddingPress,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content_container}>
        <Image source={image} style={styles.image} />
        <View style={styles.res_info_container}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name_text}>
            {name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addOnInfo} _text>
            {addOnInfo}
          </Text>
          <Text style={styles.totalUnitPrice_text}>{totalUnitPrice}đ</Text>
        </View>
        <ProductQuantityAdjuster
          style={{ marginTop: 'auto' }}
          buttonRadius={23}
          quantity={quantity}
          onSubtractPress={onSubtractPress}
          onAddingPress={onAddingPress}
        />
      </View>
    </View>
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
    width: 60,
    height: 60,
    borderRadius: 10,
    marginEnd: 10,
  },

  res_info_container: {
    flex: 1,
    justifyContent: 'center',
  },

  name_text: {
    fontFamily: 'Manrope-Bold',
    color: COLOR.text_primary_color,
    fontSize: 18,
  },

  totalUnitPrice_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    marginStart: 5,
    marginEnd: 10,
    color: COLOR.indicator_current_color,
  },
});

export default CartProductBar;
