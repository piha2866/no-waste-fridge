import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AppNavigator} from './src/navigation/AppNavigator';
import { initializeDB } from './src/backend/db/init';

const App = () => {
  useEffect(() => {
    console.log("inside use Effect")
    initializeDB();
  }, []);
  console.log("CREATEDs")
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
