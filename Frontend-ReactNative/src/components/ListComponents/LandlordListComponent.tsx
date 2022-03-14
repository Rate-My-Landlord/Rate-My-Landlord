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
  } else if (props.rating > 2 && props.rating < 3.5) {
    ratingColor = "orange";
  }

  return (
    <View style={styles().listItemContainer}>
      <View style={headerStyle(ratingColor).headerContainer}>
        <Text style={styles().headerText}>{props.name}</Text>
      </View>
      <View style={styles().bodyContainer}>
        <View>
          <Text style={styles().ratingText}>{"Overall: " + props.rating}</Text>
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
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
    borderColor: ThemeColors.darkGrey,
    borderWidth: 2,
  },
  bodyContainer: {
    flex: 2,
    backgroundColor: ThemeColors.grey,
    padding: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: ThemeColors.white,
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  ratingContainer: {
    flex: 1
  },
  spacer: {
    flex: 3,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 13,
    paddingBottom: 2.5,
    textAlign: 'center',
  },
  star: {
    flex: 1,
  },
  reviewPageButton: {
    flex: 1,
    backgroundColor: ThemeColors.white,
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
    borderColor: ThemeColors.darkGrey,
    borderWidth: 2,
    width: 45,
  },
})

const headerStyle = (ratingColor : any) => StyleSheet.create({
  headerContainer: {
    flex: 2,

    // Color Logic
    backgroundColor: ratingColor == "green" ? ThemeColors.green
      : ratingColor == "orange" ? ThemeColors.orange : ThemeColors.red,
    
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    padding: 0,

    flexDirection: 'row',
  },
})