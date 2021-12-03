/*
  Author: Hayden Stegman

  About: This page is the landlord page, here all of a landlords reviews that
  that have been left about them are displayed.
*/
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';

// List Item
import { ReviewComponent } from '../components/ReviewListComponent'

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
import ILandlord from '../interfaces/landlord';
import axios from 'axios';

//Colors
const { primary } = Colors;

type landlordScreenProp = StackNavigationProp<RootStackParamList, 'Landlord'>;

const baseURL = "http://10.0.0.165:5000"

/* 
  Landlord Screen
*/
function LandlordScreen({ navigation, route: {params}}) {
  const [landlord, setLandlord] = useState<ILandlord | undefined>(undefined)

  useEffect(() => {
    axios.get(`${baseURL}${params.url}`)
      .then(res => { 
        setLandlord(res.data);
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
        <SubTitle>Showing all Reviews for {landlord?.first_name}</SubTitle>
        {landlord?.reviews.map(review => <ReviewComponent name={review.text} overall_star_rating={review.overall_star_rating} />)}
      </InnerContainer>
    </StyledContainer>
  );
};

export default LandlordScreen;