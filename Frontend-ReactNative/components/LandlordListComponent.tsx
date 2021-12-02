/*
  Author: Hayden Stegman
*/
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../screens/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type SearchResultsScreenProp = StackNavigationProp<RootStackParamList, 'Results'>;

/* 
  Component added to list for each landlord present in area.
  Features:
    - Name
    - 1-5 Star Rating
    - Button to go to landlord page
*/
export const LandlordComponent = ( props:any ) => {
  const navigation = useNavigation<SearchResultsScreenProp>();
  return (
    <View style={{ backgroundColor: 'rgba(90,90,90,0.14)', padding: 10, margin: 2, width: '80%'}}>
      <Text>{props.name}</Text>
      <Text>{props.rating}</Text>
      <Button
        title={props.name + "'s Reviews"}
        onPress={() => navigation.navigate('Landlord')}
      />
    </View>
  );
};