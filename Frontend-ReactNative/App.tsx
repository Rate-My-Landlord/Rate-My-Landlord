import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { registerRootComponent } from 'expo';
import loadUserCredsFromLocal, { getRefreshToken, saveUserCredsToLocal } from './src/global/localStorage';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screen
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen';
import ReviewScreen from './src/screens/ReviewScreen'
import AddReviewsScreen from './src/screens/AddReviewsScreen';

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { useEffect } from 'react';


/* Apollo Config */
const apolloHttpLink = createHttpLink({
  uri: 'http://127.0.0.1:5000/api/graphql'
})

// Setting the jwt in the header if it is in local storage.
// This will run every time, however, it will cache previous queries
// So if you just log a user in, you might need to reset the cache.
// https://www.apollographql.com/docs/react/caching/advanced-topics/#resetting-the-cache
const apolloAuthLink = setContext(async (request, { headers }) => {
  let accessToken;
  // Kind of hacky way to get a refresh token
  if (request.operationName === 'RefreshToken') {
    accessToken = await getRefreshToken().then(res => res);
  } else {
    accessToken = await loadUserCredsFromLocal().then(res => res?.accessToken);
  }
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    }
  }
})

// Error handling for api requests
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, apolloAuthLink.concat(apolloHttpLink)]),
  cache: new InMemoryCache()
})

/* For displaying URLs on desktop */
const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: '',
      Profile: 'profile',
      NewReview: ':landlordId/newReview',
      NotFound: '*'
    }
  }
}

export type NavParamList = {
  Home: undefined,
  Profile: undefined,
  Reviews: undefined,
  AddReviews: undefined,
}

// Mobile
const Tab = createBottomTabNavigator<NavParamList>();
// Web
const Stack = createNativeStackNavigator<NavParamList>();
// For Search ???
const StackSearch = createNativeStackNavigator();


// User Search Flow Stack Navigation
function HomeFlow() {
  return (
    <StackSearch.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackSearch.Screen name="Home" component={HomeScreen} />
      <StackSearch.Screen name="Reviews" component={ReviewScreen} />
    </StackSearch.Navigator>
  );
}

// Main App Tab Navigation
export default function App() {

  // A kind of hacky way to get a new token on startup
  useEffect(() => {
    client.query({
      query: gql`
      query RefreshToken {
        RefreshToken {
          success,
          token,
          id
        }
      }`
    }).then(res => res.data.RefreshToken)
      .then(res => saveUserCredsToLocal(res.id, res.token));
  }, [])

  return (
    <ApolloProvider client={client}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        {Platform.OS === 'ios' || Platform.OS === 'android' ? (
          // Phone Navigation
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: any = "";

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Profile') {
                  iconName = 'person';
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
            <Tab.Screen name="Home" component={HomeFlow} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
          // Web Navigation
        ) : (
          <Stack.Navigator
            screenOptions={({
              headerShown: false,
            })}
          >
            <Stack.Screen name="Home" component={HomeFlow} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Reviews" component={ReviewScreen} />
            <Stack.Screen name="AddReviews" component={AddReviewsScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
}

// AppRegistry.registerComponent('RateMyLandlord', () => App);
registerRootComponent(App);