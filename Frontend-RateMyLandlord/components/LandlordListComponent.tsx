/*
  Author: Hayden Stegman
*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text } from 'react-native-elements';

/* 
  Component added to list for each landlord present in area.
*/
export const LandlordComponent = (props: any) => {
  const navigation = useNavigation();

  return (
      <Button onPress={() => navigation.navigate('LandlordScreen' as never,  {url: props.url} as never )}>
        <Text>{props.name + "'s Reviews"}</Text>
      </Button>
  );
};