/*
  Author: Hayden Stegman
*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from './Star';

/* 
  Component added to list for each landlord present in area.
*/
export const LandlordComponent = (props: any) => {
  const navigation = useNavigation();

  // Logic For Review Colors
  let ratingColor = "green"; // Default Green

  if(props.rating <= 2) {
    ratingColor = "red";
  } else if (props.rating == 3) {
    ratingColor = "orange";
  }

  return (
    <View style={styles().listItemContainer}>
      <View style={headerStyle(ratingColor).headerContainer}>
        <Text style={styles().headerText}>{props.name}</Text>
      </View>
      <View style={styles().bodyContainer}>
        <Text style={styles().ratingText}>Overall</Text>
        <Star style={styles().star} rating={props.rating}/>
      </View>
    </View>
  );
};

const styles = () => StyleSheet.create({
  // Back Ground Contain
  listItemContainer: {
    flexDirection: 'column',
    height: 100,
    marginVertical: 10,
    width: '100%',
    borderRadius: 15,
    backgroundColor: "#F3F3F3",
  },
  bodyContainer: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 10,
  },
  star: {
    flex: 1,
  }
})

const headerStyle = (ratingColor : any) => StyleSheet.create({
  headerContainer: {
    flex: 2,

    // Red = #EF4444
    // Green = #10B981
    // Orange = #FAAF3E

    // Color Logic
    backgroundColor: ratingColor == "green" ? '#10B981'
      : ratingColor == "orange" ? '#FAAF3E' : '#EF4444',
    
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: 'center',
    padding: 0,
  },
})