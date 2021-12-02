/*
  Author: Hayden Stegman
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './screens/RootStackParamList';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen'
import LandlordScreen from './screens/LandlordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={HomeScreen}/>
        <Stack.Screen name="Results" component={SearchResultsScreen}/>
        <Stack.Screen name="Landlord" component={LandlordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}