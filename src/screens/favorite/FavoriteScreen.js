import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { FavoriteMealBar, FavoriteRestaurantBar } from '~/components/favorite';
import { restaurants, products } from '~/constants/TempData';
import { AppContext } from '../../contexts/AppContext';
import { useNavigationRef } from '../../contexts/BottomTabNavigatorContext';

const FavoriteScreen = ({ navigation }) => {
  const navigationRef = useNavigationRef();

  const { favoriteRestaurants, favoriteMeals } = useContext(AppContext);
  // console.log(favoriteMeals);

  const [isRestaurantSelected, setIsRestaurantSelected] = useState(true);

  const onRestaurantSelected = () => {
    if (!isRestaurantSelected) setIsRestaurantSelected(true);
  };

  const onMealSelected = () => {
    if (isRestaurantSelected) setIsRestaurantSelected(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={{ paddingHorizontal: 21 }}>
        <Text style={styles.header_text}>Favorite</Text>
        <View style={styles.switcher_container}>
          <Pressable
            onPress={onRestaurantSelected}
            style={[
              styles.switcher_option_container,
              {
                borderBottomColor: isRestaurantSelected
                  ? COLOR.indicator_current_color
                  : COLOR.background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.switcher_option_text,
                {
                  color: isRestaurantSelected
                    ? COLOR.indicator_current_color
                    : COLOR.text_primary_color,
                },
              ]}
            >
              Recent
            </Text>
          </Pressable>
          <Pressable
            onPress={onMealSelected}
            style={[
              styles.switcher_option_container,
              {
                borderBottomColor: !isRestaurantSelected
                  ? COLOR.indicator_current_color
                  : COLOR.background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.switcher_option_text,
                {
                  color: !isRestaurantSelected
                    ? COLOR.indicator_current_color
                    : COLOR.text_secondary_color,
                },
              ]}
            >
              Close to Me
            </Text>
          </Pressable>
        </View>
      </View>
      {isRestaurantSelected ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 110 }}
          data={favoriteRestaurants}
          renderItem={({ item }) => (
            <FavoriteRestaurantBar
              name={item.name}
              logo={item.logo}
              address={item.address}
              // distance={1.5}
              // estimateTime={15}
              rating={item.rating}
              onPressFunction={() => {
                navigation.navigate('Home', {
                  screen: 'RestaurantMenu_Screen',
                  params: {
                    restaurantID: item.id, //try replace the restaurantsByCategoryList with passing the item as the param of the callback function
                    restaurantName: item.name,
                    restaurantLogo: item.logo,
                    restaurantWallpaper: item.wallpaper,
                    restaurantAddress: item.address,
                  },
                });
              }}
            />
          )}
        />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 110 }}
          data={favoriteRestaurants}
          renderItem={({ item }) => (
            <FavoriteRestaurantBar
              name={item.name}
              logo={item.logo}
              address={item.address}
              // distance={1.5}
              // estimateTime={15}
              rating={item.rating}
              onPressFunction={() => {
                navigation.navigate('Home', {
                  screen: 'RestaurantMenu_Screen',
                  params: {
                    restaurantID: item.id, //try replace the restaurantsByCategoryList with passing the item as the param of the callback function
                    restaurantName: item.name,
                    restaurantLogo: item.logo,
                    restaurantWallpaper: item.wallpaper,
                    restaurantAddress: item.address,
                  },
                });
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background_color,
    flex: 1,
  },

  header_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 36,
    color: COLOR.text_primary_color,
    marginVertical: 5,
  },

  switcher_container: {
    flexDirection: 'row',
  },

  switcher_option_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  switcher_option_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 17.5,
  },
});

export default FavoriteScreen;
