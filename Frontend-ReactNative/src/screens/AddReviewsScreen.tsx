import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform, useWindowDimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { AddButton } from '../components/AddButton';
import MainContainer from '../components/mainContainer';
import widthDepStyles from '../Styles/styles-width-dep';

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

// const PostReview = gql`
//   mutation NewReview($landlordId: ID!, $overallStarRating: Int!, $text: String) {
//     NewReview(landlordId: $landlordId, overallStarRating: $overallStarRating, text: $text) {
//       success
//     }
//   }
// `

const AddReviewsScreen = ({ route, navigation }: any) => {
  const windowWidth = useWindowDimensions().width;

  /*
  const landlordId = route.params.landlordId;

  const [newReview, { data, loading, error}] = useMutation(PostReview);

  const postReview = () => {
    newReview({variables: {
      landlordId: landlordId,
      overallStarRating: parseInt(rating),
      text: comments
    }}).then(res => navigation.navigate('Web_Home'));
  }
  */

  const [rating, onRatingText] = useState('1');
  const [comments, onCommentsText] = useState("");
  return(
    <MainContainer windowWidth={windowWidth} >
    <>
      <View style={widthDepStyles(windowWidth).listContainer}>
        <View style={styles(windowWidth).FormContainer}>
          <TextInput style={textStyles.input} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
          <TextInput style={textStyles.input} placeholder={'Comment'} keyboardType='default' onChangeText={onCommentsText} />
          <TouchableOpacity style={{ backgroundColor: 'black', padding: 10 }}><Text style={{ color: 'white' }}>New Review</Text></TouchableOpacity>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// Page Styles
const styles = (windowWidth: any) => StyleSheet.create({
  // Back Ground Contain
  backgroundScreen: {
    backgroundColor: "#ffffff",
    flex: 1,
  },

  // Main Dividers of the Screen (Header from Body)
  headerScreen: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0,

    // Header Gap - Only on Web
    margin: Platform.OS === 'ios' || Platform.OS === 'android' ? 0 : 5,

    // Rounded Corners - All 4 on Web, Bottom 2 on IOS/Andriod
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRadius: Platform.OS === 'ios' || Platform.OS === 'android' ? 0 : 15,

    // Shadow
  },
  bodyScreen: {
    flex: 10,
    flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 15,
    paddingHorizontal: (Platform.OS === 'ios' || Platform.OS === 'android') ? 0 : '10%',
    backgroundColor: '#ffffff',
  },

  // Body Containers (Right Ad Space (Web Only) and Main Container)
  rightContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,

    //Temp for Visibility
    backgroundColor: '#E5E7EB',

    // Temp for Text Viewing
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
  },
  mainContainer: {
    // Change FlexBox valuse based on screen size
    marginHorizontal: 10,

    // Flex Settings
    flex: 3,
    flexDirection: windowWidth >= screenChangePoint ? 'row-reverse' : 'column-reverse',
  },

  // Content Containers
  FormContainer: {
    flex: windowWidth >= screenChangePoint ? 2 : 5,
    backgroundColor: "#D4D4D4",
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right rounded only on Web when screen is big.
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 15 : 0,
  },

  // Temp
  textColor: {
    color: '#1F2937',
  },
})