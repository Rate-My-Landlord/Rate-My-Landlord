/*
  Author: Hayden Stegman
*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from '../star/Star';
import { FontAwesome } from '@expo/vector-icons'
import { ThemeColors } from '../../constants/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from '../../../App';
import { getRatingColor } from '../../utils';

/* 
  Component added to list for each landlord present in area.
*/

type Props = {
  id: string,
  firstName: string,
  lastName: string,
  overallRating: number,
  totalReviews: number
}


export const LandlordComponent = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParamList, "Home">>();

  return (
    <View style={styles.listItemContainer}>
      <View style={[styles.headerContainer, { backgroundColor: getRatingColor(props.overallRating) }]}>
        <Text style={styles.headerText}>{props.firstName} {props.lastName}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{"Overall: " + props.overallRating}({props.totalReviews})</Text>
          <Star rating={props.overallRating} />
        </View>
        <View style={{ flex: 2 }} />
        {/** Button to Go to Review Screen */}
        <TouchableOpacity style={styles.reviewPageButton} onPress={() => navigation.navigate('Reviews', { landlordId: props.id })}>
          <FontAwesome name="arrow-right" size={25} color={ThemeColors.darkBlue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Back Ground Contain
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 100,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: ThemeColors.darkGrey,
    borderWidth: 2,
  },
  headerContainer: {
    flex: 2,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    padding: 0,
    flexDirection: 'row',
  },
  headerText: {
    color: ThemeColors.white,
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  bodyContainer: {
    flex: 2,
    backgroundColor: ThemeColors.grey,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ratingContainer: {
    flex: 3,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 13,
    paddingBottom: 2.5,
    textAlign: 'center',
  },
  reviewPageButton: {
    flex: 1,
    flexGrow: .7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.white,
    borderRadius: 5,
    borderColor: ThemeColors.darkGrey,
    borderWidth: 2,
    aspectRatio: 1,
  },
})