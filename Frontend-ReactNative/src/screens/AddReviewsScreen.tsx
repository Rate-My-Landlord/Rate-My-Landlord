import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { AddButton } from '../components/AddButton';
import MainContainer from '../components/mainContainer';
import widthDepStyles from '../Styles/styles-width-dep';
import formStyles from '../Styles/styles-form';
import pageStyles from '../Styles/styles-page'
import { ThemeColors } from '../constants/Colors';
import { isMobileDevice } from '../utils';
import StarInput from '../components/star/starInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import { Mutation, MutationNewReviewArgs, Query, QueryLandlordByIdArgs, ReviewResult } from '../../graphql/generated';
import { LANDLORD_REVIEWS } from './ReviewScreen';
import { UserContext } from '../global/userContext'


type FieldProps = {
  title: string,
  rating: number,
  setRating: (rating: number) => void;
}

const StarField = (props: FieldProps) => (
  <View style={styles.formItem}>
    <Text style={styles.sectionText}>{props.title}</Text>
    <StarInput star={props.rating} setStar={props.setRating} />
  </View>
)

type Props = NativeStackScreenProps<NavParamList, "NewReview">;

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
  const { user } = useContext(UserContext);
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
    <MainContainer >
      <>
        {!user ? <Text>Must be logged in to post reviews</Text>
          :
          <>
            <View style={styles.container}>

              <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                <Text style={pageStyles.whiteHeaderText}>Post a Review for {data?.LandlordById.landlord?.firstName}</Text>
              </View>
              <View style={styles.padding}>
                <StarField title="Overall Rating" rating={overallRating} setRating={setOverallRating} />
                <StarField title="Communication Skills" rating={communicationRating} setRating={setCommunicationRating} />
                <StarField title="Maintenance Skills" rating={maintenanceRating} setRating={setMaintenanceRating} />

                <View style={styles.formItem}>
                  <Text style={styles.sectionText}>Comments</Text>
                  <TextInput
                    style={styles.commentInput}
                    maxLength={350}
                    multiline={true}
                    placeholder={'Comment'}
                    keyboardType='default'
                    onChangeText={onCommentsText} />
                </View>

                <TouchableOpacity style={formStyles.submit} onPress={handleSubmit}><Text style={formStyles.submitText}>Post Review</Text></TouchableOpacity>
              </View>
            </View>
            <View style={widthDepStyles(windowWidth).listControlContainer}>
              <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate("Reviews", { landlordId: route.params.landlordId })} />
            </View>
          </>
        }
      </>
    </MainContainer>

  );
}

// Page Styles
const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 5,
  },
  padding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberInput: {
    height: '35%',
    borderWidth: 1,
    padding: 10,
  },
  commentInput: {
    flex: 1.5,
    borderWidth: 1,
    padding: 10,
  },
  formItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    // Rounded Corners - All 4 on Web, Bottom 2 on IOS/Andriod
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRadius: isMobileDevice() ? 0 : 15,
  },
  sectionText: {
    flex: 1,
    color: ThemeColors.darkBlue,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
    textAlign: 'left'
  },
})

export default AddReviewScreen;