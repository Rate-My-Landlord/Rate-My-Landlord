/*
  Author: Hayden Stegman
*/
import React from 'react';
import { Platform } from 'react-native';

//Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen Imports
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
// Searching
import LandlordScreen from './screens/SearchScreenFlow/LandlordScreen';
import { Ionicons } from '@expo/vector-icons';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/api/graphql',
  cache: new InMemoryCache()
});



// Create the Tab Bottom Navigator
const Tab = createBottomTabNavigator();
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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {Platform.OS === 'ios' || Platform.OS === 'android' ? (
          // Phone Navigation
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: any = "";

                if (route.name === 'IOS Home') {
                  iconName = 'home';
                } else if (route.name === 'Settings') {
                  iconName = 'settings';
                } else if (route.name === 'Profile') {
                  iconName = 'person';
                } else if (route.name === 'Login') {
                  iconName = 'person-add';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} color={color} size={size} />;
              },
              // Icon Colors
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',

              headerShown: false,
              tabBarShowLabel: false,
            })}
          >
            {isSignedIn == true ? (
              <>
                <Tab.Screen name="IOS Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </>
            ) : (
              <>
                <Tab.Screen name="IOS Home" component={HomeScreen} />
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </>
            )}
          </Tab.Navigator>
          // Web Navigation
        ) : (
          <Stack.Navigator
            screenOptions={({
              headerShown: false,
            })}
          >
            {isSignedIn == true ? (
              <>
                <Stack.Screen name="Web Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Web Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
              </>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
}