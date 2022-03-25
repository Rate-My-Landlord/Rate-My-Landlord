/*
  Author: Hayden Stegman
*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from '../star/Star';
import { ThemeColors } from '../../constants/Colors';
import { Review } from '../../../graphql/generated';
import dayjs from 'dayjs';

/* 
  Component added to list for each landlord present in area.
*/

type Props = {
  review: Review
}

export const ReviewComponent = ({ review }: Props) => {
  const navigation = useNavigation();

  // Logic For Review Colors
  let ratingColor = "green"; // Default Green

  if (review.overallStarRating <= 2) {
    ratingColor = "red";
  } else if (review.overallStarRating == 3) {
    ratingColor = "orange";
  }

  return (
    <View style={styles.listItemContainer}>

      <View style={headerStyle(ratingColor).headerContainer} />
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.ratingText}>Overall</Text>
          <Star style={styles.star} rating={review.overallStarRating} />
          <Text>{dayjs(review.createdAt).format("MMM D, YYYY")}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.spacer} />
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Back Ground Contain
  listItemContainer: {
    flexDirection: 'row',
    height: 100,
    marginVertical: 5,
    width: '100%',
    borderRadius: 15,
    borderColor: ThemeColors.darkGrey,
    borderWidth: 3,
  },
  bodyContainer: {
    flex: 7,
    backgroundColor: ThemeColors.grey,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerText: {
    color: ThemeColors.white,
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
  line: {
    height: 2,
    width: '15%',
    borderTopColor: ThemeColors.darkBlue,
    borderTopWidth: 3,
    borderRadius: 5,
    margin: 5
  }
})

const headerStyle = (ratingColor: any) => StyleSheet.create({
  headerContainer: {
    flex: 1,

    // Color Logic
    backgroundColor: ratingColor == "green" ? '#10B981'
      : ratingColor == "orange" ? '#FAAF3E' : '#EF4444',

    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: 'center',
    padding: 0,
  },
})