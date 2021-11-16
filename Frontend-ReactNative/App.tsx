/*
  Author: Hayden Stegman
*/

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ title: 'Rate My Landlord' }}
        />
        <Stack.Screen
          name="LandlordPage"
          component={LandlordPageScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* 
  Home Screen
*/
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      {/* Page Heading */}
      <Text>Showing all Landlords from '05401'</Text>
      <StatusBar style="auto" />

      {/* List of Landlords */}
      <LandlordWidget name='Chris'/>
      <LandlordWidget name='Mark'/>
      <LandlordWidget name='Charlie'/>
      <LandlordWidget name='Sarah'/>
    </View>
  );
};

/* 
  Landlord Screen
*/
const LandlordPageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Landlord 1 Page</Text>
      <StatusBar style="auto" />

      <Button
        title="Home"
        onPress={() =>
          navigation.navigate('Home')
        }
      />
    </View>
  );
};

{/* 
  Widget added to list for each landlord present in area.
  Features:
    - Name
    - 1-5 Star Rating
    - Button to go to landlord page
*/}
const LandlordWidget = ( props ) => {
  return (
    <view style={{ backgroundColor: 'grey', padding: 10, margin: 2, width: '80%'}}>
      <text>{props.name}</text>
      <Button
        title={props.name + "'s Reviews"}
      />
    </view>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
