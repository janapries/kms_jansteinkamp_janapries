import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostListScreen from '../src/presentation/PostListScreen';
import PostFormScreen from '../src/presentation/PostFormScreen';
import PostDetailScreen from '../src/presentation/PostDetailScreen';

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
      <Stack.Screen name="Home" component={PostListScreen} />
      <Stack.Screen name="Create" component={PostFormScreen} />
      <Stack.Screen name="Detail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
}