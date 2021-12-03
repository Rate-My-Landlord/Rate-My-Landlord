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
import { Star } from './Star';

/* 
  Component added to list for each landlord present in area.
  Features:
    - Name
    - 1-5 Star Rating
    - Button to go to landlord page
*/
export const LandlordComponent = (props: any) => {
  const navigation = useNavigation();

  console.log(props)

  return (
    <ListItemContainer>
      <InlineContainter>
        <ListTitle>{props.name}</ListTitle>
        <Star rating={props.rating} />
      </InlineContainter>
      <StyledButton onPress={() => navigation.navigate('Landlord' as never,  {"url": props.url} as never )}>
        <ButtonText>{props.name + "'s Reviews"}</ButtonText>
      </StyledButton>
    </ListItemContainer>
  );
};