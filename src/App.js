import { React } from 'react';

import { AppProvider } from '~/contexts/AppContext';
import AppNav from '~/navigators/AppNav';

function App() {
  return (
    <AppProvider>
      <AppNav />
    </AppProvider>
  );
}

export default App;
