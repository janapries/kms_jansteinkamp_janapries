import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStack';


export function DetailScreen() {
    // use Nav braucht die Paramliste wegen der Overload Fehlermeldung, gekommen durch AI nachfrag, NavigationsQuelle war React doc
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screeeeeen</Text>
      <Text>Detail Screen</Text>
      <Text>Detail Screen</Text>
    </View>
  );
}