import { React, useState, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroStackNavigator from '~/navigators/IntroStackNavigator';
import AuthenticateStackNavigator from '~/screens/authenticate/SignInUpScreen';

const MainStack = createStackNavigator();

function App() {
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunch');
    if (appData == null) {
      setIsAppFirstLaunch(true);
      AsyncStorage.setItem('isAppFirstLaunch', 'false');
    } else {
      setIsAppFirstLaunch(false);
    }
  }, []);

  return (
    isAppFirstLaunch != null && (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar backgroundColor="#FFFFFF" />
        <NavigationContainer>
          <MainStack.Navigator screenOptions={{ headerShown: false }}>
            {isAppFirstLaunch && <MainStack.Screen name="Intro" component={IntroStackNavigator} />}
            <MainStack.Screen name="Authenticate" component={AuthenticateStackNavigator} />
          </MainStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  );
}

export default App;
