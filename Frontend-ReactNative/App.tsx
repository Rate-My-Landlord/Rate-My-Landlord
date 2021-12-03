/*
  Author: Hayden Stegman
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './screens/RootStackParamList';

// Styles
import { Colors } from './components/styles'
const { tertiary } = Colors;

// Screen Imports
import HomeScreen from './Screens/HomeScreen';
import SearchResultsScreen from './Screens/SearchResultsScreen'
import LandlordScreen from './Screens/LandlordScreen';
import { LandlordComponent } from './components/LandlordListComponent';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Search"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: ''
        }}
      >
        <Stack.Screen name="Search" component={HomeScreen}/>
        <Stack.Screen name="Results" component={SearchResultsScreen}/>
        <Stack.Screen name="Landlord" component={LandlordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}