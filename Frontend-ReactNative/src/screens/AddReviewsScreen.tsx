import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { AddButton } from '../components/AddButton';
import MainContainer from '../components/mainContainer';
import widthDepStyles from '../Styles/styles-width-dep';
import formStyles from '../Styles/styles-form';
import pageStyles from '../Styles/styles-page'
import { ThemeColors } from '../constants/Colors';
import { isMobileDevice, isMobileScreen } from '../utils';
import StarInput from '../components/star/starInput';

// The point at which style changes
const screenChangePoint = 1250;

const AddReviewsScreen = ({ route, navigation }: any) => {
  const windowWidth = useWindowDimensions().width;

  const [rating, onRatingText] = useState('1');
  const [comments, onCommentsText] = useState("");

  const [overallRating, setOverallRating] = useState<number>(0);

  return(
    <MainContainer windowWidth={windowWidth} >
    <>
      <View style={formStyles.container}>
        <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
              <Text style={pageStyles.whiteHeaderText}>Write Review for 'Name'</Text>
        </View>
        <View style={styles.padding}>
          <View style={styles.formItem}>
            <Text style={textStyles.sectionText}>Overall</Text>
            {/* Example of star rating */}
            <StarInput star={overallRating} setStar={setOverallRating} />
            {/* <TextInput style={textStyles.numberInput} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} /> */}
          </View>
          <View style={styles.formItem}>
            <Text style={textStyles.sectionText}>Communication Skills</Text>
            <TextInput style={textStyles.numberInput} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
          </View>
          <View style={styles.formItem}>
            <Text style={textStyles.sectionText}>Property Maintainence Level</Text>
            <TextInput style={textStyles.numberInput} placeholder={'Overall Rating (1-5)'} keyboardType='numeric' onChangeText={onRatingText} />
          </View>
          <View style={styles.formItem}>
            <Text style={textStyles.sectionText}>Comments</Text>
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
  },
  sectionText: {
    color: ThemeColors.darkBlue,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
  },
});

// Page Styles
const styles = StyleSheet.create({
  formItem: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: isMobileDevice() ? 40 : 0,

    // Header Gap - Only on Web
    margin: isMobileDevice() ? 0 : 5,

    // Rounded Corners - All 4 on Web, Bottom 2 on IOS/Andriod
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRadius: isMobileDevice() ? 0 : 15,
  },
  padding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right rounded only on Web when screen is big.
    //borderTopRightRadius: !isMobileScreen() ? 15 : 0,
  },

  // Temp
  textColor: {
    color: '#1F2937',
  },
})