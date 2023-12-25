import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable, FlatList } from 'react-native';
import { COLOR } from '~/constants/Colors';
import { FavoriteMealBar, FavoriteRestaurantBar } from '~/components/favorite';
import { restaurants, products, pendingOrders, doneOrders } from '~/constants/TempData';
import { OrderCard } from '~/components/order';

const OrderScreen = ({ navigation }) => {
  const onOrderCartPress = () => {
    navigation.navigate('ConfirmOrder_Screen', { isViewOnly: true });
  };

  const [isOnGoingSelected, setIsOnGoingSelected] = useState(true);

  const onOnGoingSelected = () => {
    if (!isOnGoingSelected) setIsOnGoingSelected(true);
  };

  const onCompletedSelected = () => {
    if (isOnGoingSelected) setIsOnGoingSelected(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <View style={{ paddingHorizontal: 21 }}>
        <Text style={styles.header_text}>Orders</Text>
        <View style={styles.switcher_container}>
          <Pressable
            onPress={onOnGoingSelected}
            style={[
              styles.switcher_option_container,
              {
                borderBottomColor: isOnGoingSelected
                  ? COLOR.indicator_current_color
                  : COLOR.background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.switcher_option_text,
                {
                  color: isOnGoingSelected
                    ? COLOR.indicator_current_color
                    : COLOR.text_primary_color,
                },
              ]}
            >
              Ongoing
            </Text>
          </Pressable>
          <Pressable
            onPress={onCompletedSelected}
            style={[
              styles.switcher_option_container,
              {
                borderBottomColor: !isOnGoingSelected
                  ? COLOR.indicator_current_color
                  : COLOR.background_color,
              },
            ]}
          >
            <Text
              style={[
                styles.switcher_option_text,
                {
                  color: !isOnGoingSelected
                    ? COLOR.indicator_current_color
                    : COLOR.text_secondary_color,
                },
              ]}
            >
              History
            </Text>
          </Pressable>
        </View>
      </View>
      {isOnGoingSelected ? (
        <View style={{ marginHorizontal: 21 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
            data={pendingOrders}
            renderItem={({ item }) => (
              <OrderCard
                onPressFunction={onOrderCartPress}
                completedOrder={false}
                id={item.id}
                date={item.date}
                resName={item.resName}
                items={item.items}
                totalPrice={item.totalPrice}
              />
            )}
          />
        </View>
      ) : (
        <View style={{ marginHorizontal: 21 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
            data={doneOrders}
            renderItem={({ item }) => (
              <OrderCard
                // onPressFunction={onOrderCartPress}
                completedOrder={true}
                id={item.id}
                date={item.date}
                resName={item.resName}
                items={item.items}
                totalPrice={item.totalPrice}
              />
            )}
          />
        </View>
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
    marginBottom: 15,
  },

  switcher_option_text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 17.5,
  },
});

export default OrderScreen;
