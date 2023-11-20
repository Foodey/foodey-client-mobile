import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import IntroScreen from './screens/SplashScreen';
import OnBoardingScreen1 from './screens/OnBoardingScreen1';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" />
      <OnBoardingScreen1 />
    </SafeAreaView>
  );
}

export default App;
