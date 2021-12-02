/*
  Author: Hayden Stegman
*/
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LandlordComponent } from '../components/LandlordListComponent'
import ILandlords from '../interfaces/landlords';

const baseURL = "http://localhost:5000/api/v0";

/* 
  Search Results Screen
*/
function SearchResultsScreen() {
  const [landlords, setLandlords] = useState<ILandlords[] | undefined>(undefined);

  useEffect(() => {
    axios.get(`${baseURL}/landlords/`)
      .then(res => {
        setLandlords(res.data.landlords);
      });
  }, [])

  return (
    <View style={styles.container}>
      {/* Page Heading */}
      <Text>Showing all Landlords from '05401'</Text>
      <StatusBar style="auto" />
      
      {landlords?.map(landlord => <LandlordComponent name={landlord.first_name} rating={landlord.overall_rating} />)}

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