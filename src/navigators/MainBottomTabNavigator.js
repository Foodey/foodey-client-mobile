import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLOR } from '~/constants/Colors';

const BottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarStyle: {
          backgroundColor: COLOR.input_background_color,
          height: '10%',
          borderTopWidth: 0,
          paddingLeft: 8,
          paddingRight: 8,
        },
        tabBarIcon: ({ focused }) => {
          let iconName = focused ? HomeBarFocusedIcon : HomeBarIcon;
          return (
            <View>
              <SvgXml xml={iconName} height={28} width={28} />
            </View>
          );
        },
        tabBarActiveTintColor: PURPLE_COLOR,
        tabBarInactiveTintColor: WHITE_TEXT_COLOR,
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'Lato-Regular' },
      })}
      initialRouteName="Home"
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Calendar" component={CalendarScreen} />
      <BottomTab.Screen
        name="Empty"
        component={EmptyScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 68,
                height: 68,
                borderRadius: 50,
                backgroundColor: PURPLE_COLOR,
                marginTop: -64,
              }}
              activeOpacity={0.5}
            >
              <SvgXml xml={AddIcon} height={36} width={36} />
            </TouchableOpacity>
          ),
          tabBarLabel: () => null,
        }}
      />
      <BottomTab.Screen name="Focuse" component={FocuseScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default MainBottomTabNavigator;
