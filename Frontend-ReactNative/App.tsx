/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StyleSheet} from 'react-native';
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SearchResults" component={SearchResultsScreen}/>
        <Stack.Screen name="Landlord" component={LandlordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
    Style Sheet
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
