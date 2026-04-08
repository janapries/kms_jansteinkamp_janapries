import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListView from '../feature/screens/ListView'
import CreatePost from '../feature/screens/CreatePost'
import DetailScreen from '../feature/screens/DetailScreen'

export type RootStackParamList = {
  Home: undefined;
  Provider: undefined;
  Create: undefined | { id?: string };
  Detail: { id: string };
};

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ListView} />
      <Stack.Screen name="Create" component={CreatePost} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}