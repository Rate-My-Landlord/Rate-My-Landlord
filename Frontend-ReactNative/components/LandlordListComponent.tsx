/*
  Author: Hayden Stegman
*/
import React from 'react';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../screens/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type SearchResultsScreenProp = StackNavigationProp<RootStackParamList, 'Results'>;

// Styles
import {
  LeftIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ListItemContainer,
  ListTitle,
  StarContainer,
  InlineContainter
} from './styles';

// Colors
const { brand, darkLight, primary } = Colors;

// Icons
import{ FontAwesome } from '@expo/vector-icons'

/* 
  Component added to list for each landlord present in area.
  Features:
    - Name
    - 1-5 Star Rating
    - Button to go to landlord page
*/
export const LandlordComponent = ( { navigation: { navigate }}, props:any ) => {
  // const navigation = useNavigation<SearchResultsScreenProp>();
  return (
    <ListItemContainer>
      <InlineContainter>
        <ListTitle>{props.name}</ListTitle>
        <StarContainer>
          <FontAwesome name="star" color={ brand } size={ 20 } />
          <FontAwesome name="star" color={ brand } size={ 20 } />
          <FontAwesome name="star-half-empty" color={ brand } size={ 20 } />
          <FontAwesome name="star-o" color={ brand } size={ 20 } />
          <FontAwesome name="star-o" color={ brand } size={ 20 } />
        </StarContainer>
      </InlineContainter>
      <StyledButton onPress={() => navigate('Landlord', {url: props.url})}>
        <ButtonText>{props.name + "'s Reviews"}</ButtonText>
      </StyledButton>
    </ListItemContainer>
  );
};