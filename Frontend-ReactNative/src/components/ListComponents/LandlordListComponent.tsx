/*
  Author: Hayden Stegman
*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from '../Star';
import{ FontAwesome } from '@expo/vector-icons'
import { ThemeColors } from '../../constants/Colors';

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
        <View>
          <Text style={styles().ratingText}>Overall</Text>
          <Star style={styles().star} rating={props.rating}/>
        </View>
        <View style={styles().spacer}/>
        
        {/** Button to Go to Review Screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
          <View style={styles().reviewPageButton}><FontAwesome name="arrow-right" size={30} color={ThemeColors.darkBlue}/></View>
        </TouchableOpacity>
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
    paddingHorizontal: 15,
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
  ratingContainer: {
    flex: 1
  },
  spacer: {
    flex: 3,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
  star: {
    flex: 1,
  },
  reviewPageButton: {
    flex: 1,
    backgroundColor: ThemeColors.grey,
    borderRadius: 15,
    alignItems: 'center',
    padding: 5,
  },
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