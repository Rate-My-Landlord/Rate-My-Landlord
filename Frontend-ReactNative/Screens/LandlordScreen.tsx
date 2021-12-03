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

const baseURL = "http://localhost:5000/api/v0"

/* 
  Landlord Screen
*/
function LandlordScreen({ navigation, route}) {
  // const navigation = useNavigation<landlordScreenProp>();
  const [landlord, setLandlord] = useState<ILandlord | undefined>(undefined)

  console.log(route.url)

  // useEffect(() => {
  //   axios.get(`${baseURL}/landlords/z/${3}`)
  //     .then(res => { 
  //       console.log(res.data)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
        <InnerContainer>
        {/* Page Heading */}
        <PageTitle>Rate My Landlord</PageTitle>
        <SubTitle>Showing all Reviews for 'Joe Schmoe'</SubTitle>
        {/* <ReviewComponent name="Not your average joe!" text="Joe is actually insane! Would NOT rent from him again! But if you have to... His rent price is pretty fair."/>
        <ReviewComponent name="Meh." text="Rented from him cause I was out of options. Not the worst landlord. But the house sucked! Decent price on rent tho."/>
        <ReviewComponent name="~Beware Joe Schmoe~" text="Signed the lease before I met the guy. YIKES! Dude is a mess. The property was run down with broken plumming, doors, and serious electrical issues. Guess thats what you get for $25 a month."/>
        <ReviewComponent name="I'd rather be homeless" text="Need I say more. The dumpster behind the place would make for a better home."/>
        <ReviewComponent name="BEST LANDLORD EVER!" text="Best landlord ever! We hosted the wildest parties here. Wicked mad ripper parties for days and Joe Schmoe never cared at all. Man even ripped some beers with us. Radical times my dudes."/> */}
      </InnerContainer>
    </StyledContainer>
  );
};

export default LandlordScreen;