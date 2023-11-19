import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import IntroScreen from './screens/SplashScreen';

function App(): JSX.Element {
  return <IntroScreen />;
}

export default App;
