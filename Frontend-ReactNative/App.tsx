/*
  Author: Hayden Stegman
*/
import React from 'react';
import{ Platform } from 'react-native';

//Navigation Imports
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Imports
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
// Searching
import SearchScreen from './screens/SearchScreenFlow/SearchScreen';
import LandlordScreen from './screens/SearchScreenFlow/LandlordScreen';

// Create the Tab Bottom Navigator
const BTab = createBottomTabNavigator();
const TTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// User Search Flow Stack Navigation
function SearchFlow() {
  return (
      <Stack.Navigator
        initialRouteName="SearchScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTransparent: true,
          headerTitle: ''
      }}
      >
        <Stack.Screen 
          name="Search Screen" 
          component={HomeScreen} 
          />
        <Stack.Screen name="Landlord Screen" component={LandlordScreen} />
      </Stack.Navigator>
  );
}

let isSignedIn = false;
let isMobile = false;

// Main App Tab Navigation
export default function App() {
  return (
    <NavigationContainer>
      { Platform.OS === 'ios' || Platform.OS === 'android' ? (
        // Phone Navigation
        <BTab.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent'
            },
            headerTransparent: true,
            headerTitle: ''
          }}
        >
        { isSignedIn == true ? (
          <>
            <BTab.Screen name="IOS Home" component={HomeScreen} />
            <BTab.Screen name="Search" component={SearchFlow} />
            <BTab.Screen name="Profile" component={ProfileScreen} />
            <BTab.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <BTab.Screen name="IOS Home" component={HomeScreen} />
            <BTab.Screen name="Search" component={SearchFlow} />
            <BTab.Screen name="Login" component={LoginScreen} />
            <BTab.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
        </BTab.Navigator>
      // Web Navigation
      ) : (
        <TTab.Navigator 
          initialRouteName="Home"
        >
        { isSignedIn == true ? (
          <>
            <TTab.Screen name="Web Home" component={HomeScreen} />
            <TTab.Screen name="Search" component={SearchFlow} />
            <TTab.Screen name="Profile" component={ProfileScreen} />
            <TTab.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <TTab.Screen name="Web Home" component={HomeScreen} />
            <TTab.Screen name="Search" component={SearchFlow} />
            <TTab.Screen name="Login" component={LoginScreen} />
            <TTab.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
        </TTab.Navigator>
      )}
    </NavigationContainer>
  ); 
}