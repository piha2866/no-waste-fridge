import DetailsScreen from "../screens/content-details/details_screen";
import ContentScreen from "../screens/content/content_screen";
import React from "react";import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
}
