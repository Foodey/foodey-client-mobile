import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { COLOR } from '~/constants/Colors';
import { LocationDisplay, CircleCategory, TruncateRestaurantCard } from '~/components/home';
import { FullArrowRight, Search } from '~/resources/icons';
import Style from './HomeStyle';
import ArrowRight from '~/resources/icons/arrow-right';
import { SearchScreen } from '~/screens/home';
import { HomeContext } from '~/contexts/HomeContext';
import { AppContext } from '~/contexts/AppContext';
import { restaurants, offers } from '~/constants/TempData';
import { getCategoriesAPI, getRecommendShopAPI } from '../../apiServices/HomeService';
import HTTPStatus from '../../constants/HTTPStatusCodes';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = ({ navigation }) => {
  const { categoriesList, setCategoriesList } = useContext(HomeContext);
  const { userLocation, setUserLocation } = useContext(AppContext);
  const [recommendShops, setRecommendShops] = useState([]);

  // useEffect(() => {
  //   const getLocation = async () => {
  //     try {
  //       const granted = await requestLocationPermission();
  //       if (granted) {
  //         Geolocation.getCurrentPosition(
  //           (position) => {
  //             // console.log(position);
  //             const { latitude, longitude } = position.coords;
  //             setUserLocation({ latitude: latitude, longitude: longitude });
  //           },
  //           (error) => console.log('Error getting user location ' + error),
  //         );
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     } catch (error) {
  //       console.error('Error getting location permission:', error);
  //       console.log(error.message);
  //     }
  //   };

  //   getLocation();
  // }, []);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'This app needs access to your location.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } catch (error) {
  //     console.error('Error requesting location permission:', error);
  //     return false;
  //   }
  // };

  useLayoutEffect(() => {
    const fetch = async () => {
      try {
        // const response = await getRecommendShopAPI(userLocation.latitude, userLocation.longitude);
        const response = await getRecommendShopAPI(50.1113, 90.5);
        if (response.status === HTTPStatus.OK) {
          setRecommendShops(response?.data?.content);
        } else {
          console.log('Error');
        }
      } catch (err) {
        console.log('Error when fetching recommend shops');
      }
    };

    fetch();
  }, [userLocation]);

  useLayoutEffect(() => {
    const getCategoriesFunction = async () => {
      try {
        const response = await getCategoriesAPI();
        if (response.status === HTTPStatus.OK) {
          setCategoriesList(response.data.content);
        } else {
          console.log('Unexpected error when fetching categories');
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCategoriesFunction();
  }, []);

  const { userInfo } = useContext(AppContext);

  //Navigation:
  const seeAllCategoriesHandler = () => {
    navigation.navigate('Categories_Screen');
  };

  const seeAllOfferNearbyHandler = () => {
    navigation.navigate('OfferNearBy_Screen');
  };

  const seeAllNewTrendingHandler = () => {
    navigation.navigate('NewTrending_Screen', { currentRecommendedShops: recommendShops });
  };

  const seeSearchResultHandler = () => {
    setSearchVisible(false);
    navigation.navigate('SearchResult_Screen');
  };

  //Use states
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <SearchScreen
        visible={searchVisible}
        onClosePress={() => {
          setSearchVisible(false);
        }}
        onSelectedItem={seeSearchResultHandler}
        onSubmitEditing={() => {
          setSearchVisible(false);
          navigation.navigate('SearchResult_Screen');
        }}
      />
      <LocationDisplay style={Style.header} location="69 Tân Lập, Đông Hòa, Dĩ An, Bình Dương" />
      <Pressable
        onPress={() => setSearchVisible(true)}
        style={[styles.searchBar_container, Style.search_bar]}
      >
        <Search
          width={24}
          height={24}
          style={{ marginStart: 12, flex: 1, color: COLOR.button_primary_color }}
        />
        <TextInput
          editable={false}
          style={[styles.searchBar_location_text]}
          placeholder="Search Foods, Restaurants etc"
          placeholderTextColor={COLOR.text_press_color}
        />
      </Pressable>
      <ScrollView style={styles.scrollView_container} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginHorizontal: 21 }}>
          <Text style={Style.screen_title_text}>Hi, </Text>
          <Text
            style={[
              Style.screen_title_text,
              { color: COLOR.button_primary_color, fontFamily: 'Manrope-Bold' },
            ]}
          >
            {userInfo.name}
          </Text>
        </View>
        <View style={{ width: '90%', height: 290, marginHorizontal: 21 }}>
          <Text style={styles.section_title_text}>Categories</Text>
          <View style={styles.categories_container}>
            <View style={styles.categories_row_container}>
              <CircleCategory
                imageStyle={{ width: 50, height: 50 }}
                imageLink={categoriesList[0]?.image}
                title={categoriesList[0]?.name}
                onPressFunction={() =>
                  navigation.navigate('CategoryDetail_Screen', {
                    categoryID: categoriesList[0].id,
                    category: categoriesList[0].name,
                  })
                }
              />
              <CircleCategory
                imageStyle={{ width: 50, height: 50 }}
                imageLink={categoriesList[1]?.image}
                title={categoriesList[1]?.name}
                onPressFunction={() =>
                  navigation.navigate('CategoryDetail_Screen', {
                    categoryID: categoriesList[1].id,
                    category: categoriesList[1].name,
                  })
                }
              />
              <CircleCategory
                imageStyle={{ width: 50, height: 50 }}
                imageLink={categoriesList[2]?.image}
                title={categoriesList[2]?.name}
                onPressFunction={() =>
                  navigation.navigate('CategoryDetail_Screen', {
                    categoryID: categoriesList[2].id,
                    category: categoriesList[2].name,
                  })
                }
              />
            </View>
            <View style={styles.categories_row_container}>
              <CircleCategory
                imageStyle={{ width: 50, height: 50 }}
                imageLink={categoriesList[3]?.image}
                title={categoriesList[3]?.name}
                onPressFunction={() =>
                  navigation.navigate('CategoryDetail_Screen', {
                    categoryID: categoriesList[3].id,
                    category: categoriesList[3].name,
                  })
                }
              />
              <CircleCategory
                imageStyle={{ width: 50, height: 50 }}
                imageLink={categoriesList[4]?.image}
                title={categoriesList[4]?.name}
                onPressFunction={() =>
                  navigation.navigate('CategoryDetail_Screen', {
                    categoryID: categoriesList[4].id,
                    category: categoriesList[4].name,
                  })
                }
              />
              <Pressable
                onPress={seeAllCategoriesHandler}
                style={({ pressed }) => [
                  {
                    width: 112,
                    height: 112,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: COLOR.button_primary_color,
                    backgroundColor: pressed
                      ? COLOR.input_background_color
                      : COLOR.background_color,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <FullArrowRight
                  width={24}
                  height={24}
                  style={{ color: COLOR.button_primary_color }}
                />
                <Text
                  style={{
                    fontFamily: 'Manrope-Medium',
                    fontWeight: '500',
                    fontSize: 16.5,
                    color: COLOR.button_primary_color,
                  }}
                >
                  See alls
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.new_trending_container}>
          <View style={styles.offerNearby_header_container}>
            <Text style={styles.section_title_text}>New & Trending</Text>
            <Pressable
              style={{ marginLeft: 'auto', flexDirection: 'row' }}
              onPress={() => seeAllNewTrendingHandler()}
            >
              <Text
                style={{
                  fontFamily: 'Manrope-Medium',
                  fontSize: 15,
                  color: COLOR.text_secondary_color,
                }}
              >
                See all
              </Text>
              <FullArrowRight
                width={24}
                height={24}
                style={{ color: COLOR.text_secondary_color, marginStart: 5 }}
              />
            </Pressable>
          </View>
          {/* New & Trending list */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 15 }}
            data={recommendShops}
            renderItem={({ item }) => (
              <TruncateRestaurantCard
                style={{ marginStart: 21, width: 202, height: 163 }}
                imageStyle={{ height: 113 }}
                wallpaper={item?.wallpaper}
                logo={item?.logo}
                name={item?.name}
                addressDetails={item?.address?.addressDetails}
                distance={1.2} // this distance should be calculated depends on the current location of user
              />
            )}
            ListFooterComponent={() => (
              <View style={[styles.list_footer_container, { width: 100, height: 163 }]}>
                <Pressable
                  style={styles.seeAll_round_button}
                  onPress={() => seeAllNewTrendingHandler()}
                >
                  <ArrowRight width={18} height={18} style={{ color: COLOR.background_color }} />
                </Pressable>
                <Text
                  style={{
                    fontFamily: 'Manrope-Medium',
                    fontSize: 15,
                    color: COLOR.text_secondary_color,
                  }}
                >
                  See All
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView_container: {},

  section_title_text: {
    fontFamily: 'Manrope-Medium',
    fontWeight: '500',
    fontSize: 21,
    color: COLOR.text_primary_color,
  },

  categories_container: {
    flex: 1,
    marginTop: 15,
  },

  categories_row_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  offerNearby_container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: COLOR.indicator_color,
    marginTop: 15,
  },

  offerNearby_header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 21,
  },

  new_trending_container: {
    width: '100%',
    marginTop: 15,
    marginBottom: 20,
  },

  list_footer_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeAll_round_button: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: COLOR.text_secondary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.input_background_color,
    borderRadius: 12,
  },

  searchBar_location_text: {
    flex: 9,
    fontFamily: 'Manrope-Regular',
    fontWeight: '400',
    fontSize: 17.5,
    color: COLOR.text_primary_color,
    marginStart: 10,
  },

  searchBar_button_delete_input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 3,
  },

  searchBar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.input_background_color,
    borderRadius: 12,
  },

  searchBar_location_text: {
    flex: 9,
    fontFamily: 'Manrope-Regular',
    fontWeight: '400',
    fontSize: 17.5,
    color: COLOR.text_primary_color,
    marginStart: 10,
  },
});

export default HomeScreen;
