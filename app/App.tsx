import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { DatabaseProvider } from './src/context/db';
import { SettingsProvider, useSettings } from './src/context/settings';
import { AppNavigator } from './src/navigation/AppNavigator';

const AppContent = () => {
  const { isReady } = useSettings();

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator />;
};

const App = () => {
  return (
    <PaperProvider>
      <SettingsProvider>
        <DatabaseProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </DatabaseProvider>
      </SettingsProvider>
    </PaperProvider>
  );
};

export default App;
