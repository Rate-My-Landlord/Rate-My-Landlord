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
// import StarInput from '../components/star/starInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import { Mutation, MutationNewReviewArgs, Query, QueryLandlordByIdArgs } from '../../graphql/generated';
import { LANDLORD_BY_ID } from './ReviewScreen';
import { UserContext } from '../global/userContext'
import { Item } from '../components/form/dropdown';
import RightContainer from '../components/containers/rightContainer';
import LeftContainer from '../components/containers/leftContainer';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import DropdownField from '../components/form/dropdownField';
import StarInput from '../components/form/starField';
import TextField from '../components/form/textField';

const noProperty: Item = { label: 'No Property', value: '-1' };

type FieldProps = {
  title: string,
  rating: number,
  setRating: (rating: number) => void;
}

// const StarField = (props: FieldProps) => (
//   <View style={styles.formItem}>
//     <Text style={styles.sectionText}>{props.title}</Text>
//     <StarInput style={{ flex: 1, justifyContent: 'center' }} star={props.rating} setStar={props.setRating} />
//   </View>
// )

type Props = NativeStackScreenProps<NavParamList, "AddReview">;

type Inputs = {
  property?: string,
  overallRating: number,
  communicationRating: number,
  maintenanceRating: number,
  comments: string
}

export const GET_LANDLORD = gql`
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
      query: LANDLORD_BY_ID,
      variables: {
        landlordId: route.params.landlordId
      }
    }]
  });

  const { register, setValue, control, handleSubmit, formState: { errors: formErrors }, setError, clearErrors } = useForm<Inputs>();

  // For dropdown - populating properties
  const [properties, setProperties] = useState<Item[]>();
  useEffect(() => {
    if (data?.LandlordById.landlord?.properties?.length! > 0) {
      let _properties: Item[] = [noProperty];
      data?.LandlordById.landlord?.properties!.map(property => {
        _properties.push({ label: `${property?.address1}, ${property?.city}, ${property?.state}`, value: property?.id! })
      })
      setProperties(_properties);
    }
  }, [data])

  useEffect(() => {
    register("property");
    setValue("property", undefined);
    register("overallRating");
    setValue("overallRating", 0);
    register("communicationRating");
    setValue("communicationRating", 0);
    register("maintenanceRating")
    setValue("maintenanceRating", 0);
  }, [register])

  const setProperty = (e: Item) => setValue("property", e.value);
  const setOverallRating = (e: number) => {
    setValue("overallRating", e);
    clearErrors("overallRating");
  }
  const setCommunicationRating = (e: number) => setValue("communicationRating", e);
  const setMaintenanceRating = (e: number) => setValue("maintenanceRating", e);

  const onSubmit: SubmitHandler<Inputs> = data => {
    postReview({
      variables: {
        authorId: user!.userId,
        landlordId: route.params.landlordId,
        propertyId: data.property ? data.property : undefined,
        overallStarRating: data.overallRating,
        communicationStarRating: data.communicationRating,
        maintenanceStarRating: data.maintenanceRating,
        text: data.comments
      },
      onCompleted({ NewReview }) { NewReview.success && navigation.navigate("Reviews", { landlordId: route.params.landlordId }) }
    })
  }

  const onError: SubmitErrorHandler<Inputs> = data => { };

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
                    <DropdownField label="Property" name="property" error={formErrors.property} control={control} items={properties} setChoice={setProperty} style={styles.formItem} />
                  }
                  <StarInput label='Overall Rating' name="overallRating" error={formErrors.overallRating} control={control} rules={{ required: true, validate: (value: number) => value !== 0 || "This field is required" }} setStar={setOverallRating} style={styles.formItem} />
                  <StarInput label='Communication Rating' name="communicationRating" error={formErrors.communicationRating} control={control} setStar={setCommunicationRating} style={styles.formItem} />
                  <StarInput label='Maintenance Rating' name="maintenanceRating" error={formErrors.maintenanceRating} control={control} setStar={setMaintenanceRating} style={styles.formItem} />
                  <TextField label='Comments' name="comments" error={formErrors.comments} control={control} textInputProps={{ keyboardType: "default", multiline: true, maxLength: 400 }} style={styles.formItem} />

                  <TouchableOpacity style={[formStyles.submit, styles.submit]} onPress={handleSubmit(onSubmit, onError)}>
                    <Text style={formStyles.submitText}>Post Review</Text>
                  </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
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