import React, { useContext, useEffect } from 'react';

import { AppProvider, AppContext } from '~/contexts/AppContext';
import AppNav from '~/navigators/AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  return (
    <AppProvider>
      <AppNav />
    </AppProvider>
  );
}

export default App;
