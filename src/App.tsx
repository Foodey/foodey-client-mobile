import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import IntroScreen from './screens/SplashScreen';
import OnBoardingScreen1 from './screens/OnBoardingScreen1';
import OnBoardingScreen2 from './screens/OnBoardingScreen2';
import OnBoardingScreen3 from './screens/OnBoardingScreen3';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" />
      <OnBoardingScreen3 />
    </SafeAreaView>
  );
}

export default App;
