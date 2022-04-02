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
import { getRatingColor } from '../../utils';

/* 
  Component added to list for each landlord present in area.
*/

type Props = {
  review: Review
}

export const ReviewComponent = ({ review }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.listItemContainer}>
      <View style={[styles.headerContainer, { backgroundColor: getRatingColor(review.overallStarRating) }]} />
      <View style={styles.bodyContainer}>
        <View style={styles.ratingHeader}>
          <View style={styles.rating}>
            <Text style={styles.overallText}>Overall</Text>
            <Star rating={review.overallStarRating} />
            {review.text !== null &&
              <View style={{ flex: 2 }}>
                <View style={styles.line} />
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            }
          </View>
          <Text style={styles.ratingDate}>{dayjs(review.createdAt).format("MMM D, YYYY")}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Back Ground Contain
  listItemContainer: {
    flexDirection: 'row',
    minHeight: 100,
    marginVertical: 5,
    borderRadius: 15,
    borderColor: ThemeColors.darkGrey,
    borderWidth: 3,
  },
  headerContainer: {
    flex: 1,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: 'center',
    padding: 0,
  },
  headerText: {
    color: ThemeColors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  bodyContainer: {
    flex: 7,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: ThemeColors.grey,
    paddingHorizontal: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  ratingHeader: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20
  },
  rating: {
    flex: 1,
    flexDirection: 'column',
  },
  ratingDate: {
    flex: 1,
    textAlign: 'right',
  },
  overallText: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  line: {
    flex: .5,
    width: '50%',
    borderTopColor: ThemeColors.darkBlue,
    borderTopWidth: 3,
    margin: 3,
    alignSelf: 'center'
  },
  reviewText: {
    flex: 1,
    // alignSelf: 'center'
  }
})