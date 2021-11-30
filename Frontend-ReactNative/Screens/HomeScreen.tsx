/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

/*
  Home Screen
*/
function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>()
  return (
    <View style={styles.container}>
      <Text>Search:</Text>
      <StatusBar style="auto" />

      <Button
        title="Search"
        onPress={() => navigation.navigate('SearchResults')}
      />
    </View>
  );
};

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

export default HomeScreen;