import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ContentScreen from '../screens/content/content_screen';
import DetailsScreen from '../screens/content-details/details_screen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Content">
      <Stack.Screen name="Content" component={ContentScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export type StackParamList = {
  Content: undefined;
  Details: undefined;
};
