import { View, StyleSheet, Text } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { Location, Search } from '~/resources/icons';

function LocationDisplay({ style, location }) {
  return (
    <View style={[styles.container, style]}>
      <Location
        width={24}
        height={24}
        style={{ marginStart: 12, color: COLOR.indicator_current_color }}
      />
      <Text style={[styles.location_text]} ellipsizeMode="tail" numberOfLines={1}>
        {location}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.indicator_trans_color,
    borderRadius: 12,
  },

  location_text: {
    fontFamily: 'Manrope-Regular',
    fontWeight: '400',
    fontSize: 17.5,
    color: COLOR.indicator_current_color,
    marginStart: 5,
  },
});

export default LocationDisplay;
