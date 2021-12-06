/*
  Author: Hayden Stegman
*/
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LandlordComponent } from '../components/LandlordListComponent'
import ILandlords from '../interfaces/landlords';
import { useNavigation } from '@react-navigation/native';

// Styles
import { 
  InnerContainer,
  ListItemContainer,
  ListTitle, 
  PageTitle, 
  StyledButton, 
  StyledContainer, 
  SubTitle,
  Colors 
} from '../components/styles';

//Colors
const { primary } = Colors;

// Icons
import{ FontAwesome } from '@expo/vector-icons'

const baseURL = "http://10.0.0.20:5000/api/v0";
//const baseURL = "http://10.0.0.165:5000/api/v0";

/* 
  Search Results Screen
*/
function SearchResultsScreen({ navigation, route }) {
  // const navigation = useNavigation();
  const { zipcode } = route.params;

  const [landlords, setLandlords] = useState<ILandlords[] | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${baseURL}/landlords/z/${zipcode}`)
      .then(res => { 
        setLandlords(res.data.landlords); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        {/* Page Heading */}
        <PageTitle>Rate My Landlord</PageTitle>
        <SubTitle>Showing all Landlords from '{zipcode}'</SubTitle>

        {/* Populate the Review list with the data from the search */}
        {landlords?.map(landlord => <LandlordComponent key={landlord.id} url={landlord.url} name={`${landlord.first_name} ${landlord.last_name}`} rating={landlord.overall_rating} />)}
        
      </InnerContainer>
      <ListItemContainer>
        <ListTitle center={true}>Landlord Missing - Add them</ListTitle>
        <StyledButton>
          <FontAwesome name="plus" size={ 30 } color={primary} />
        </StyledButton>
      </ListItemContainer>
    </StyledContainer>
  );
};

export default SearchResultsScreen;