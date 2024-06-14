import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SearchBar } from '../../components';
import { Marker } from 'react-native-maps';
import { GeocodingService } from '../../apiServices/ggMapService';
import { useDebounce } from '../../utils/hooks';

const SelectAddressScreen = ({ navigation, route }) => {
  const [region, setRegion] = useState({
    latitude: 37.4220936,
    longitude: -122.083922,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [searchAddress, setSearchAddress] = useState('');
  const [markerLocation, setMarkerLocation] = useState();

  const handleLocationSelected = (location) => {
    setRegion({
      ...region,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const onSubmitEditing = async () => {
    console.log(searchAddress);
    if (searchAddress.trim() === '') return;

    const location = await GeocodingService.searchLocation(searchAddress);
    if (location) {
      console.log('Location found');
      setMarkerLocation(location);
      handleLocationSelected(location);
    }
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header_container}>
        <Pressable onPress={() => onBackPress()}>
          <Text style={{ fontFamily: 'Manrope-Bold', color: COLOR.text_primary_color }}>BACK</Text>
        </Pressable>
        <SearchBar
          style={{ flex: 1, marginStart: 10 }}
          value={searchAddress}
          placeholder="Search your address..."
          onChangeText={(text) => setSearchAddress(text)}
          onDeletePress={() => setSearchAddress('')}
          onSubmitEditing={() => onSubmitEditing()}
        />
      </View>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={region}>
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Selected Location"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: COLOR.background_color,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  header_container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1,
  },
});

export default SelectAddressScreen;
