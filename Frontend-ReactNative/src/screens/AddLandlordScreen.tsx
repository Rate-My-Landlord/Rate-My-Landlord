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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';
import { Mutation, MutationNewReviewArgs, LandlordResult, MutationNewLandlordArgs} from '../../graphql/generated';
import { UserContext } from '../global/userContext'
import RightContainer from '../components/containers/rightContainer';
import LeftContainer from '../components/containers/leftContainer';

type Props = NativeStackScreenProps<NavParamList, "AddLandlord">;

const POST_LANDLORD = gql`
  mutation NewLandlord($firstName: String!, $lastName: String!, $zipCode: String!) {
      NewReview(firstName: $landlordFirstName, lastName: $landlordLastName, zipCode: $zipCode) {
          success,
          errors,
          landlord,
        }
    }
`

const AddLandlordScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  const { user } = useContext(UserContext);
  const [postLandlord, { data: postData, loading: postLoading, error: postError }] = useMutation<Mutation, MutationNewLandlordArgs>(POST_LANDLORD);
  const [landlordFirstName, setLandlordFirstName] = useState("");
  const [landlordLastName, setLandlordLastName] = useState("");
  const [zipcode, setZipcode] = useState("");

  const resetForm = () => {
    setLandlordFirstName("");
    setLandlordLastName("");
    setZipcode("");
  }

  const handleSuccess = (NewLandlord: LandlordResult) => {
    if (NewLandlord.success) return navigation.navigate("Home")
  }

  const handleSubmit = () => {
    postLandlord({
      variables: {
        firstName: landlordFirstName,
        lastName: landlordLastName,
        zipCode: zipcode,
      },
      onCompleted({ NewLandlord }) { NewLandlord && handleSuccess(NewLandlord) }
    })
  }

  return (
    <MainContainer >
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

        <View style={[styles.container, isMobileScreen(windowWidth) && { flexDirection: 'column-reverse' }]}>
          <LeftContainer style={widthDepStyles(windowWidth).listControlContainer}>
            <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate("Home")} />
          </LeftContainer>

          <RightContainer>
            <>
              <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                <Text style={pageStyles.whiteHeaderText}>Add a Landlord</Text>
              </View>
              {!user ? <Text style={styles.sectionText}>Must be logged in to add Landlords</Text>
                :
                <View style={styles.form}>
                  <TextInput 
                    maxLength={50}
                    multiline={false}
                    placeholder={'First Name'}
                    keyboardType='default'
                    onChangeText={setLandlordFirstName}
                    value={landlordLastName}
                  />
                  <TextInput
                    maxLength={50}
                    multiline={false}
                    placeholder={'Last Name'}
                    keyboardType='default'
                    onChangeText={setLandlordLastName}
                    value={landlordLastName}
                  />
                  <TextInput
                    maxLength={50}
                    multiline={false}
                    placeholder={'Zipcode'}
                    keyboardType='default'
                    onChangeText={setZipcode}
                    value={zipcode}
                  />

                  <TouchableOpacity style={[formStyles.submit, styles.submit]} onPress={handleSubmit}><Text style={formStyles.submitText}>Add Landlord</Text></TouchableOpacity>
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

export default AddLandlordScreen;