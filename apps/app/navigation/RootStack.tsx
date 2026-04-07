import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import  ListView  from '../feature/screens/ListView'
import  CreatePost  from '../feature/screens/CreatePost'

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
};

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={ListView} />
      <Stack.Screen name="Create" component={CreatePost} />
    </Stack.Navigator>
  );
}