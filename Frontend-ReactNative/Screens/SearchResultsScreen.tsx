/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LandlordComponent } from '../components/LandlordListComponent'

/* 
  Search Results Screen
*/
function SearchResultsScreen() {
  return (
    <View style={styles.container}>
      {/* Page Heading */}
      <Text>Showing all Landlords from '05401'</Text>
      <StatusBar style="auto" />
      
      <LandlordComponent name="Jim" rating="1.5/10" />
      <LandlordComponent name="Carl" rating="6.2/10" />
      <LandlordComponent name="Ellen" rating="4.4/10" />
      <LandlordComponent name="Hinsdale Properties" rating="9.5/10" />
    </View>
  );
};

/*
    Style Sheet
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchResultsScreen;