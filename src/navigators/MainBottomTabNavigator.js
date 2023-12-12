import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLOR } from '~/constants/Colors';
import {
  Home,
  HomeFocused,
  Discovery,
  DiscoveryFocused,
  Favorite,
  FavoriteFocused,
  Order,
  OrderFocused,
  Profile,
  ProfileFocused,
} from '~/resources/icons';
import {
  HomeScreen,
  DiscoverScreen,
  FavoriteScreen,
  OrderScreen,
  ProfileScreen,
} from '~/screens/main';

import { CustomTabLabel } from '~/components';

const BottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarStyle: {
          backgroundColor: COLOR.input_background_color,
          height: 88,
          borderTopWidth: 0,
          paddingLeft: 8,
          paddingRight: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Manrope',
          fontWeight: '400',
          marginBottom: 21,
          color: COLOR.text_primary_color,
        },
      })}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeFocused height={30} width={30} /> : <Home height={30} width={30} />,

          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Home" />,
        }}
      />
      <BottomTab.Screen
        name="Discovery"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <DiscoveryFocused height={30} width={30} />
            ) : (
              <Discovery height={30} width={30} />
            ),
          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Discovery" />,
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FavoriteFocused height={30} width={30} />
            ) : (
              <Favorite height={30} width={30} />
            ),

          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Favorite" />,
        }}
      />
      <BottomTab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <OrderFocused height={30} width={30} /> : <Order height={30} width={30} />,

          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Order" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileFocused height={30} width={30} />
            ) : (
              <Profile height={30} width={30} />
            ),

          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Profile" />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainBottomTabNavigator;
