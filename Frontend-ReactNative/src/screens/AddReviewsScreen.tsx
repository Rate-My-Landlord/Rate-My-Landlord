import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { AddButton } from '../components/AddButton';
import MainContainer from '../components/mainContainer';
import widthDepStyles from '../Styles/styles-width-dep';
import formStyles from '../Styles/styles-form';
import pageStyles from '../Styles/styles-page'
import { ThemeColors } from '../constants/Colors';
import { isMobileDevice, isMobileScreen } from '../utils';
import StarInput from '../components/star/starInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList, NavParamList } from '../../App';
import { Mutation, MutationNewReviewArgs, Query, QueryLandlordByIdArgs, ReviewResult } from '../../graphql/generated';
import loadUserCredsFromLocal from '../global/localStorage';
import { IAuthUser } from '../types';
import { LANDLORD_REVIEWS } from './ReviewScreen';

type FieldProps = {
  title: string,
  rating: number,
  setRating: (rating: number) => void;
}

const StarField = (props: FieldProps) => (
  <View style={styles.formItem}>
    <Text style={textStyles.sectionText}>{props.title}</Text>
    <StarInput star={props.rating} setStar={props.setRating} />
  </View>
)

type Props = NativeStackScreenProps<HomeParamList, "NewReview">;

const GET_LANDLORD = gql`
 query GetLandlord($landlordId: ID!) {
   LandlordById(landlordId: $landlordId) {
     success,
     errors,
     landlord {
       firstName
     }
   }
 }
`

const POST_REVIEW = gql`
  mutation NewReview(
    $authorId: ID!, $landlordId: ID!, $propertyId: ID, 
    $overallStarRating: Int!, $communicationStarRating: Int, $maintenanceStarRating: Int
    $text: String) {
      NewReview(
        authorId: $authorId, landlordId: $landlordId, propertyId: $propertyId, 
        overallStarRating: $overallStarRating, communicationStarRating: $communicationStarRating, 
        maintenanceStarRating: $maintenanceStarRating, text: $text) {
          success,
          errors,
          review {
            id
          }
        }
    }
`


const AddReviewScreen = ({ route, navigation }: Props) => {
  const [user, setUser] = useState<IAuthUser | undefined | null>(undefined);
  const { loading, error, data } = useQuery<Query, QueryLandlordByIdArgs>(GET_LANDLORD, { variables: { landlordId: route.params.landlordId } });
  const [postReview, { data: postData, loading: postLoading, error: postError }] = useMutation<Mutation, MutationNewReviewArgs>(POST_REVIEW, {
    refetchQueries: () => [{
      query: LANDLORD_REVIEWS,
      variables: {
        landlordId: route.params.landlordId
      }
    }]
  });
  const [overallRating, setOverallRating] = useState<number>(0);
  const [communicationRating, setCommunicationRating] = useState<number>(0);
  const [maintenanceRating, setMaintenanceRating] = useState<number>(0);
  const [comments, onCommentsText] = useState("");

  const windowWidth = useWindowDimensions().width;

  // loadUserFromCreds() returns null if no user, so null means user is not authenticated
  const isAuthenticated = () => { return user !== null }

  useEffect(() => {
    let mounted = true;
    loadUserCredsFromLocal().then(user => {
      if (mounted) setUser(user);
    })
    return () => { mounted = false }
  }, [])

  // if (loading) return (<Text>Loading...</Text>)


  const handleSuccess = (NewReview: ReviewResult) => {
    if (NewReview.success) return navigation.navigate("Reviews", { landlordId: route.params.landlordId })
  }


  const handleSubmit = () => {
    if (overallRating === 0) return;
    postReview({
      variables: {
        authorId: user!.userId,
        landlordId: route.params.landlordId,
        overallStarRating: overallRating,
        communicationStarRating: communicationRating,
        maintenanceStarRating: maintenanceRating,
        text: comments
      },
      onCompleted({ NewReview }) { NewReview && handleSuccess(NewReview) }
    })
  }


  return (
    <MainContainer windowWidth={windowWidth} >
      <>
        {!isAuthenticated() ? <Text>Must be logged in to post reviews</Text>
          :
          <>
            <View style={formStyles.container}>
              <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                <Text style={pageStyles.whiteHeaderText}>Post a Review for {data?.LandlordById.landlord?.firstName}</Text>
              </View>
              <View style={styles.padding}>
                <StarField title="Overall Rating" rating={overallRating} setRating={setOverallRating} />
                <StarField title="Communication Skills" rating={communicationRating} setRating={setCommunicationRating} />
                <StarField title="Maintenance Skills" rating={maintenanceRating} setRating={setMaintenanceRating} />

                <View style={styles.formItem}>
                  <Text style={textStyles.sectionText}>Comments</Text>
                  <TextInput style={textStyles.commentInput} maxLength={350} multiline={true} placeholder={'Comment'} keyboardType='default' onChangeText={onCommentsText} />
                </View>

                <TouchableOpacity style={formStyles.submit} onPress={handleSubmit}><Text style={formStyles.submitText}>Post Review</Text></TouchableOpacity>
              </View>
            </View>
            <View style={widthDepStyles(windowWidth).listControlContainer}>
              <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate("Home")} />
            </View>
          </>
        }
      </>
    </MainContainer>
  );
}

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

export default AddReviewScreen;