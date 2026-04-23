import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostListScreen from '../src/feature/posts/screens/PostListScreen';
import PostFormScreen from '../src/feature/posts/screens/PostFormScreen';
import PostDetailScreen from '../src/feature/posts/screens/PostDetailScreen';

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