/*
  Author: Hayden Stegman
*/
import { createContext, useEffect, useState } from 'react';
import { Platform, AppRegistry, Text } from 'react-native';

//Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { registerRootComponent } from 'expo';
import UserContext from './src/global/userContext';

// Screen Imports
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';
// Searching
import LandlordScreen from './src/screens/SearchScreenFlow/LandlordScreen';
import { Ionicons } from '@expo/vector-icons';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { IAuthUser } from './src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const apolloHttpLink = createHttpLink({
  uri: 'http://127.0.0.1:5000/api/graphql'
})

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: '',
      Profile: 'profile',
      NewReview: ':landlordId/newReview',
      Setting: 'settings',
      NotFound: '*'
    }
  }
}

export type NavParamList = {
  Home: undefined,
  Profile: undefined,
  // New_Review: undefined,
  Settings: undefined
}

// Mobile
const Tab = createBottomTabNavigator<NavParamList>();
// Web
const Stack = createNativeStackNavigator<NavParamList>();
// For Search ???
const StackSearch = createNativeStackNavigator();


// User Search Flow Stack Navigation
function SearchFlow() {
  return (
    <StackSearch.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent'
        },
        headerTransparent: true,
        headerTitle: ''
      }}
    >
      <StackSearch.Screen name="Search Screen" component={HomeScreen} />
      <StackSearch.Screen name="Landlord Screen" component={LandlordScreen} />
    </StackSearch.Navigator>
  );
}

// Main App Tab Navigation
export default function App() {
  const [user, setUser] = useState<IAuthUser | undefined>(undefined);

  useEffect(() => {
    // mounted is to make sure that we are not generating a warning
    // read more here: https://www.debuggr.io/react-update-unmounted-component/
    let mounted = true;
    async function fetUserCreds() {
      try {
        const json_value = await AsyncStorage.getItem('@user_cred');
        if (json_value != null) setUser(json_value as unknown as IAuthUser);
      } catch (e) {
        console.log(e);
      }
    }
    if (!user) fetUserCreds();
    return () => {mounted = false};
  }, [])

  const apolloAuthLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: user?.token ? `Bearer ${user.token}` : '',
      }
    }
  })

  const client = new ApolloClient({
    link: apolloAuthLink.concat(apolloHttpLink),
    cache: new InMemoryCache()
  })


  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          {Platform.OS === 'ios' || Platform.OS === 'android' ? (
            // Phone Navigation
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: any = "";

                  if (route.name === 'Home') {
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
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
            // Web Navigation
          ) : (
            <Stack.Navigator
              screenOptions={({
                headerShown: false,
              })}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              {/* <Stack.Screen name="New_Review" component={WriteReviewScreen} /> */}
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

// AppRegistry.registerComponent('RateMyLandlord', () => App);
registerRootComponent(App);