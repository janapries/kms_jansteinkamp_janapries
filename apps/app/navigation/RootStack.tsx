import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostListScreen from '../src/feature/posts/screens/PostListScreen';
import PostFormScreen from '../src/feature/posts/screens/PostFormScreen';
import PostDetailScreen from '../src/feature/posts/screens/PostDetailScreen';
import LoginScreen from '../src/feature/auth/screens/LoginScreen';
import RegisterScreen from '../src/feature/auth/screens/RegisterScreen';
import { useAuth } from '../src/feature/auth/hooks/useAuth';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined

  Home: undefined;
  Provider: undefined;
  Create: undefined | { id?: string };
  Detail: { id: string };
};

const Stack = createNativeStackNavigator();

export function RootStack() {
  const { userToken } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        // Auth Stack: Wenn kein Token da ist, kann man NUR diese Screens sehen
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // App Stack: Wenn ein Token da ist, sind die Auth-Screens gar nicht im Baum
        <>
          <Stack.Screen name="Home" component={PostListScreen} />
          <Stack.Screen name="Create" component={PostFormScreen} />
          <Stack.Screen name="Detail" component={PostDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}