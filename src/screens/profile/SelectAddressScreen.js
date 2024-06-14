import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import React, { useState, useContext } from 'react';
import { COLOR } from '../../constants/Colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SearchBar } from '../../components';
import { Marker } from 'react-native-maps';
import { GeocodingService } from '../../apiServices/ggMapService';
import { useDebounce } from '../../utils/hooks';
import { SellerContext } from '../../contexts/SellerContext';

const SelectAddressScreen = ({ navigation, route }) => {
  const { setContextShopLocation } = useContext(SellerContext);

  const [region, setRegion] = useState({
    latitude: 37.4220936,
    longitude: -122.083922,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // const [searchAddress, setSearchAddress] = useState('');
  const [markerLocation, setMarkerLocation] = useState();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLongPress = (event) => {
    const coords = event.nativeEvent.coordinate;
    setMarkerLocation(coords);
    setButtonDisabled(false);
  };

  const handleSaveLocation = () => {
    if (markerLocation) {
      console.log(markerLocation);
      setContextShopLocation(markerLocation);
      navigation.goBack();
    }
  };

  // const handleLocationSelected = (location) => {
  //   setRegion({
  //     ...region,
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //   });
  // };

  // const onSubmitEditing = async () => {
  //   console.log(searchAddress);
  //   if (searchAddress.trim() === '') return;

  //   const location = await GeocodingService.searchLocation(searchAddress);
  //   if (location) {
  //     console.log('Location found');
  //     setMarkerLocation(location);
  //     handleLocationSelected(location);
  //   }
  // };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header_container}>
        <Pressable onPress={() => onBackPress()} style={{ marginStart: 10, marginTop: 10 }}>
          <Text style={{ fontFamily: 'Manrope-Bold', color: COLOR.text_secondary_color }}>
            BACK
          </Text>
        </Pressable>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onLongPress={handleLongPress}
      >
        {markerLocation && (
          <Marker
            coordinate={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
            }}
            title="Selected Location"
          />
        )}
      </MapView>
      <Pressable
        disabled={buttonDisabled}
        style={[
          styles.submit_button,
          {
            backgroundColor: buttonDisabled
              ? COLOR.button_press_primary_color
              : COLOR.button_primary_color,
          },
        ]}
        onPress={handleSaveLocation}
      >
        <Text style={styles.submit_button_text}>Submit Location</Text>
      </Pressable>
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

  submit_button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    left: 50,
    right: 50,
    zIndex: 1,
    backgroundColor: COLOR.button_primary_color,
    height: '7%',
    borderRadius: 10,
  },

  submit_button_text: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: COLOR.background_color,
  },
});

export default SelectAddressScreen;
