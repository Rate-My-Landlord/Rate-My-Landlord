import { useEffect, useState, useMemo } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import * as Linking from 'expo-linking';
import { registerRootComponent } from 'expo';
import loadUserCredsFromLocal, { getRefreshToken, saveUserCredsToLocal } from './src/global/localStorage';
import { IAuthUser } from './src/types';
import { isMobileScreen } from './src/utils';
import { useFonts } from 'expo-font';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavTabBar from './src/navTabBar';
// Screen
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen';
import ReviewScreen from './src/screens/ReviewScreen'
import AddReviewScreen from './src/screens/AddReviewsScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
// Context
import { UserContext } from './src/global/userContext';
import { SearchContext } from './src/global/searchContext';
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


/* Apollo Config */
const apolloHttpLink = createHttpLink({
  uri: 'http://10.0.0.133:5000/api/graphql'
})

// Setting the jwt in the header if it is in local storage.
const apolloAuthLink = setContext(async (request, { headers }) => {
  let accessToken;
  // Kind of janky way to get a refresh token
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

const navLinking = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: '',
      Reviews: 'reviews/:landlordId',
      NewReview: 'reviews/new/:landlordId',
      SearchResults: 'search',
      Profile: 'profile',
      NotFound: '*'
    }
  }
}

export type NavParamList = {
  Home: undefined,
  Reviews: { landlordId: string }
  NewReview: { landlordId: string },
  SearchResults: undefined,
  Profile: undefined,
}

// Mobile
const Tab = createBottomTabNavigator<NavParamList>();
// Web
const Stack = createNativeStackNavigator<NavParamList>();


// Main App Tab Navigation
export default function App() {
  const windowWidth = useWindowDimensions().width;

  const [user, setUser] = useState<IAuthUser | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => setZipCode(data.postal))
        .catch(error => console.log(error));
    }

    return () => { isMounted = false };
  }, [])

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // A kind of janky way to get a new token on startup
  useEffect(() => {
    loadUserCredsFromLocal().then(res => {
      if (!res) return;
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
      setUser(res);
    });
  }, [])

  // Loads Font
  let [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer linking={navLinking} fallback={<Text>Loading...</Text>}>
        <UserContext.Provider value={providerValue}>
          <SearchContext.Provider value={{ zipCode, setZipCode, searchTerm, setSearchTerm }}>
            {isMobileScreen(windowWidth) ? // Phone Navigation
              <Tab.Navigator tabBar={props => <NavTabBar {...props} />} screenOptions={{ headerShown: false }} initialRouteName="Home" >
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Reviews" component={ReviewScreen} />
                <Tab.Screen name="NewReview" component={AddReviewScreen} />
                <Tab.Screen name="SearchResults" component={SearchResultsScreen} />
              </Tab.Navigator>
              : // Web Navigation
              <Stack.Navigator screenOptions={({ headerShown: false })} initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Reviews" component={ReviewScreen} />
                <Stack.Screen name="NewReview" component={AddReviewScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
              </Stack.Navigator>
            }
          </SearchContext.Provider>
        </UserContext.Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

registerRootComponent(App);