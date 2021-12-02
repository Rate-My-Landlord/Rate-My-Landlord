/*
  Author: Hayden Stegman
*/
import React, {useState, useEffect } from 'react';
//import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LandlordComponent } from '../components/LandlordListComponent'
//import ILandlords from '../interfaces/landlords';
import { InnerContainer, PageLogo, PageTitle, StyledContainer, SubTitle } from '../components/styles';

const baseURL = "http://localhost:5000/api/v0";


/* 
  Search Results Screen
*/
function SearchResultsScreen() {
  const searchEntry = "05401"
  // const [landlords, setLandlords] = useState<ILandlords[] | undefined>(undefined);

  // useEffect(() => {
  //   axios.get(`${baseURL}/landlords/`)
  //     .then(res => {
  //       setLandlords(res.data.landlords);
  //     });
  // }, [])

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        {/* Page Heading */}
        <PageTitle>Rate My Landlord</PageTitle>
        <SubTitle>Showing all Landlords from '{searchEntry}'</SubTitle>
        <LandlordComponent name="Mark" rating={5} />

        {/* {landlords?.map(landlord => <LandlordComponent name={landlord.first_name} rating={landlord.overall_rating} />)} */}
      </InnerContainer>
    </StyledContainer>
  );
};

export default SearchResultsScreen;