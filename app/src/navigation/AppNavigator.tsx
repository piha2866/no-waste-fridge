import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import ContentScreen from '../screens/content/content_screen';
import DetailsScreen from '../screens/content-details/details_screen';
import { DetailsScreenProps } from '../screens/screens.types';
import SettingsScreen from '../screens/settings/settings_screen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Content">
      <Stack.Screen name="Content" component={ContentScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export type StackParamList = {
  Content: undefined;
  Details: DetailsScreenProps;
  Settings: undefined;
};

export type NavigationProp = NativeStackNavigationProp<StackParamList>;
export const useTypedNavigation = () => useNavigation<NavigationProp>();
