import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
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

import { DiscoverScreen } from '~/screens/discover';
import { FavoriteScreen } from '~/screens/favorite';
import { OrderScreen } from '~/screens/order';
import { ProfileScreen } from '~/screens/profile';

import HomeStackNavigator from './HomeStackNavigator';
import OrderStackNavigator from './OrderStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

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
          paddingLeft: 8,
          paddingRight: 8,
        },
      })}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeFocused height={30} width={30} /> : <Home height={30} width={30} />,

          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Home" />,
        }}
      />
      {/* <BottomTab.Screen
        name="Discovery"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <DiscoveryFocused height={30} width={30} />
            ) : (
              <Discovery height={30} width={30} />
            ),
          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Discover" />,
        }}
      /> */}
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
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <OrderFocused height={30} width={30} /> : <Order height={30} width={30} />,

          tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} label="Order" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStackNavigator}
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
