import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { DatabaseProvider } from './src/context/db';
import { AppNavigator } from './src/navigation/AppNavigator';

const App = () => {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;
