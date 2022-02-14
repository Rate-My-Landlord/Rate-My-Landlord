/*
  Author: Hayden Stegman
*/
import React from 'react';
import{ Platform } from 'react-native';

//Navigation Imports
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen Imports
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
// Searching
import SearchScreen from './screens/SearchScreenFlow/SearchScreen';
import LandlordScreen from './screens/SearchScreenFlow/LandlordScreen';

// Create the Tab Bottom Navigator
const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="Search Screen" component={HomeScreen} />
        <Stack.Screen name="Landlord Screen" component={LandlordScreen} />
      </Stack.Navigator>
  );
}

let isSignedIn = false;

// Main App Tab Navigation
export default function App() {
  return (
    <NavigationContainer>
      { Platform.OS === 'ios' || Platform.OS === 'android' ? (
        // Phone Navigation
        <BottomTab.Navigator 
          initialRouteName="IOS Home"
          screenOptions={{
            headerShown: false
          }}
        >
        { isSignedIn == true ? (
          <>
            <BottomTab.Screen name="IOS Home" component={HomeScreen} />
            <BottomTab.Screen name="Search" component={SearchFlow} />
            <BottomTab.Screen name="Profile" component={ProfileScreen} />
            <BottomTab.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <BottomTab.Screen name="IOS Home" component={HomeScreen} />
            <BottomTab.Screen name="Search" component={SearchFlow} />
            <BottomTab.Screen name="Login" component={LoginScreen} />
            <BottomTab.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
        </BottomTab.Navigator>
      // Web Navigation
      ) : (
        <BottomTab.Navigator 
          initialRouteName="Web Home"
          screenOptions={{
            headerShown: false
          }}
        >
        { isSignedIn == true ? (
          <>
            <BottomTab.Screen name="Web Home" component={HomeScreen} />
            <BottomTab.Screen name="Search" component={SearchFlow} />
            <BottomTab.Screen name="Profile" component={ProfileScreen} />
            <BottomTab.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <BottomTab.Screen name="Web Home" component={HomeScreen} />
            <BottomTab.Screen name="Search" component={SearchFlow} />
            <BottomTab.Screen name="Login" component={LoginScreen} />
            <BottomTab.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  ); 
}