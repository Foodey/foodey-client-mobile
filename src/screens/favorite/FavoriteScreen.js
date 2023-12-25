import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { FavoriteMealBar, FavoriteRestaurantBar } from '~/components/favorite';
import { restaurants, products } from '~/constants/TempData';

const FavoriteScreen = ({ navigation }) => {
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
              Restaurants
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
              Meals
            </Text>
          </Pressable>
        </View>
      </View>
      {isRestaurantSelected ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 110 }}
          data={restaurants}
          renderItem={({ item }) => (
            <FavoriteRestaurantBar
              name={item.name}
              // image={{ uri: item.image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
              logo={item.logo}
              distance={1.5}
              estimateTime={15}
              rating={item.rating}
            />
          )}
        />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 110 }}
          data={products}
          renderItem={({ item }) => (
            <FavoriteMealBar
              name={item.name}
              // image={{ uri: item.image || 'https://lsvn.vn/html/lsvn-web/images/no-image.png' }}
              image={item.image}
              restaurantLogo={item.restaurantLogo}
              restaurantName={item.restaurantName}
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
