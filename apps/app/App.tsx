import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './navigation/RootStack';
import { PostProvider } from './src/feature/posts/PostProvider'
import { AuthProvider } from './src/feature/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PostProvider>
    </AuthProvider>
  );
}