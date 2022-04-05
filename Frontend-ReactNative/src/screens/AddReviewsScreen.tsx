import { gql, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AddButton } from '../components/AddButton';
import MainContainer from '../components/containers/mainContainer';
import widthDepStyles from '../Styles/styles-width-dep';
import formStyles from '../Styles/styles-form';
import pageStyles from '../Styles/styles-page';
import { ThemeColors } from '../constants/Colors';
import { isMobileScreen } from '../utils';
import StarInput from '../components/star/starInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import { Mutation, MutationNewReviewArgs, Query, QueryLandlordByIdArgs, ReviewResult } from '../../graphql/generated';
import { LANDLORD_REVIEWS } from './ReviewScreen';
import { UserContext } from '../global/userContext'
import Dropdown, { Item } from '../components/form/dropdown';
import RightContainer from '../components/containers/rightContainer';
import LeftContainer from '../components/containers/leftContainer';

const noProperty: Item = { label: 'No Property', longerLabel: '', value: '-1' };

type FieldProps = {
  title: string,
  rating: number,
  setRating: (rating: number) => void;
}

const StarField = (props: FieldProps) => (
  <View style={styles.formItem}>
    <Text style={styles.sectionText}>{props.title}</Text>
    <StarInput style={{ flex: 1, justifyContent: 'center' }} star={props.rating} setStar={props.setRating} />
  </View>
)

type Props = NativeStackScreenProps<NavParamList, "NewReview">;

const GET_LANDLORD = gql`
 query GetLandlord($landlordId: ID!) {
   LandlordById(landlordId: $landlordId) {
     success,
     errors,
     landlord {
       firstName,
       properties {
       id,
       address1,
       city,
       state
     }
     },
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
  const windowWidth = useWindowDimensions().width;
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
  const [comments, setComments] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Item>();

  // For dropdown
  const [properties, setProperties] = useState<Item[]>();
  useEffect(() => {
    if (data?.LandlordById.landlord?.properties) {
      let _properties: Item[] = [noProperty];
      data?.LandlordById.landlord?.properties.map(property => {
        _properties.push({ label: property?.address1!, longerLabel: `${property?.address1}, ${property?.city}, ${property?.state}`, value: property?.id! })
      })
      setProperties(_properties);
      setSelectedProperty(_properties[0]);
    }
  }, [data])

  const resetForm = () => {
    setOverallRating(0);
    setCommunicationRating(0);
    setMaintenanceRating(0);
    setComments("");
    properties && setSelectedProperty(properties[0]);
  }

  const handleSuccess = (NewReview: ReviewResult) => {
    if (NewReview.success) return navigation.navigate("Reviews", { landlordId: route.params.landlordId })
  }

  const handleSubmit = () => {
    if (overallRating === 0) return;
    postReview({
      variables: {
        authorId: user!.userId,
        landlordId: route.params.landlordId,
        propertyId: selectedProperty?.value !== noProperty.value ? selectedProperty?.value! : undefined,
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
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

        <View style={[styles.container, isMobileScreen(windowWidth) && { flexDirection: 'column-reverse' }]}>
          <LeftContainer style={widthDepStyles(windowWidth).listControlContainer}>
            <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate("Reviews", { landlordId: route.params.landlordId })} />
          </LeftContainer>

          <RightContainer>
            <>
              <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                <Text style={pageStyles.whiteHeaderText}>Post a Review for {data?.LandlordById.landlord?.firstName}</Text>
              </View>
              {!user ? <Text style={styles.sectionText}>Must be logged in to post reviews</Text>
                :
                <View style={styles.form}>
                  {properties &&
                    <View style={styles.formItem}>
                      <Text style={styles.sectionText}>Property</Text>
                      <Dropdown items={properties} choice={selectedProperty!} setChoice={setSelectedProperty} />
                    </View>}
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
                      onChangeText={setComments}
                      value={comments}
                    />
                  </View>

                  <TouchableOpacity style={[formStyles.submit, styles.submit]} onPress={handleSubmit}><Text style={formStyles.submitText}>Post Review</Text></TouchableOpacity>
                </View>
              }
            </>
          </RightContainer>
        </View>
      </KeyboardAwareScrollView >
    </MainContainer >

  );
}

// Page Styles
const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  containerLeft: {
    flex: 1,
  },
  containerRight: {
    flex: 3
  },
  form: {
    flex: .5,
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  commentInput: {
    flex: 1.5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 70,
    overflow: 'hidden'
  },
  formItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 2,
    // borderRadius: 5,
    // borderColor: ThemeColors.blue
  },
  sectionText: {
    flex: 1,
    color: ThemeColors.darkBlue,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
    textAlign: 'left'
  },
  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: .1,
    width: 200,
    marginHorizontal: 'auto',
  },
})

export default AddReviewScreen;