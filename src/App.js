import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from './navigators/IntroStackNavigator';
import AuthenticateStackNavigator from './screens/authenticate/SignInUpScreen';

const MainStack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" />
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Intro" component={IntroStackNavigator} />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
