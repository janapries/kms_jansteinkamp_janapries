import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './navigation/RootStack';
import { PostProvider } from './src/domain/PostProvider'

export default function App() {
  return (
    <PostProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PostProvider>
  );
}