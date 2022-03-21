import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { AddButton } from '../components/AddButton';
import MainContainer from '../components/mainContainer';
import widthDepStyles from '../Styles/styles-width-dep';
import formStyles from '../Styles/styles-form';
import pageStyles from '../Styles/styles-page'
import { ThemeColors } from '../constants/Colors';

// The point at which style changes
const screenChangePoint = 1250;

/*
  Write Review Screen


const PostReview = gql`
  mutation NewReview($landlordId: ID!, $overallStarRating: Int!, $text: String) {
    NewReview(landlordId: $landlordId, overallStarRating: $overallStarRating, text: $text) {
      success
    }
  }
`

const AddReviewsScreen = ({ route, navigation }: any) => {
  const landlordId = route.params.landlordId;

  const [newReview, { data, loading, error}] = useMutation(PostReview);

  const [rating, onRatingText] = useState('1');
  const [comments, onCommentsText] = useState("");

  const postReview = () => {
    newReview({variables: {
      landlordId: landlordId,
      overallStarRating: parseInt(rating),
      text: comments
    }}).then(res => navigation.navigate('Web_Home'));
  }

  const windowWidth = useWindowDimensions().width;

  return (
    <View style={styles(windowWidth).backgroundScreen}>
      <View style={styles(windowWidth).headerScreen}><Text style={styles(windowWidth).textColor}>Rate My Landlord</Text></View>
      <View style={styles(windowWidth).bodyScreen}>

        {/* Main Content Container }
        <View style={styles(windowWidth).mainContainer}>
          <View style={styles(windowWidth).FormContainer}>
            <TextInput style={textStyles.input} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
            <TextInput style={textStyles.input} placeholder={'Comment'} keyboardType='default' onChangeText={onCommentsText} />
            <TouchableOpacity style={{ backgroundColor: 'black', padding: 10 }} onPress={postReview}><Text style={{ color: 'white' }}>New Review</Text></TouchableOpacity>
          </View>
        </View>

        { // Right Container Only on Web and when screen is big
          (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? (
            <View style={styles(windowWidth).rightContainer}>
              <Text style={styles(windowWidth).textColor}>Ad Space?</Text>
            </View>
          ) : (<></>)
        }
      </View>
    </View>
  );
};

export default AddReviewsScreen;
*/

const PostReview = gql`
  mutation NewReview($landlordId: ID!, $overallStarRating: Int!, $text: String) {
    NewReview(landlordId: $landlordId, overallStarRating: $overallStarRating, text: $text) {
      success
    }
  }
`

const AddReviewsScreen = ({ route, navigation }: any) => {
  const windowWidth = useWindowDimensions().width;

  const [rating, onRatingText] = useState('1');
  const [comments, onCommentsText] = useState("");
  return(
    <MainContainer windowWidth={windowWidth} >
    <>
      <View style={formStyles.container}>
        <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
              <Text style={pageStyles.whiteHeaderText}>Write Review for 'Name'</Text>
        </View>
        <View style={styles.padding}>
          <View style={styles.formItem}>
            <Text style={styles.sectionText}>Overall</Text>
            <TextInput style={textStyles.numberInput} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.sectionText}>Communication Skills</Text>
            <TextInput style={textStyles.numberInput} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.sectionText}>Property Maintainence Level</Text>
            <TextInput style={textStyles.numberInput} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.sectionText}>Comments</Text>
            <TextInput style={textStyles.commentInput} maxLength={350} multiline={true} placeholder={'Comment'} keyboardType='default' onChangeText={onCommentsText} />
          </View>
          <TouchableOpacity style={formStyles.submit}><Text style={formStyles.submitText}>Post Review</Text></TouchableOpacity>
        </View>
      </View>
      <View style={widthDepStyles(windowWidth).listControlContainer}>
        <AddButton text={"Go Back"} link={'Home'}/>
      </View>
    </>
  </MainContainer>
  );
}

export default AddReviewsScreen;

const textStyles = StyleSheet.create({
  numberInput: {
    height: '35%',
    borderWidth: 1,
    padding: 10,
  },
  commentInput: {
    height: '90%',
    borderWidth: 1,
    padding: 10,
    width: '90%',
  }
});

// Page Styles
const styles = StyleSheet.create({
  formItem: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    color: ThemeColors.darkBlue,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
  },
  padding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  }
})