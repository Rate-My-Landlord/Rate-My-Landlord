import { gql, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
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
import { Mutation, LandlordResult, MutationNewLandlordArgs } from '../../graphql/generated';
import { UserContext } from '../global/userContext'
import RightContainer from '../components/containers/rightContainer';
import LeftContainer from '../components/containers/leftContainer';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '../components/form/TextField';
import { ALLLANDLORDS } from './HomeScreen';

type Props = NativeStackScreenProps<NavParamList, "AddLandlord">;

type Inputs = {
  firstName: string,
  lastName: string,
  zipCode: string,
}

const POST_LANDLORD = gql`
  mutation NewLandlord($firstName: String!, $lastName: String!, $zipCode: String!) {
      NewLandlord(firstName: $firstName, lastName: $lastName, zipCode: $zipCode) {
          success,
          errors,
        }
    }
`

const AddLandlordScreen = ({ route, navigation }: Props) => {
  const windowWidth = useWindowDimensions().width;
  const { user } = useContext(UserContext);
  const [postLandlord, { data: postData, loading: postLoading, error: postError }] = useMutation<Mutation, MutationNewLandlordArgs>(POST_LANDLORD, {
    refetchQueries: () => [{ query: ALLLANDLORDS }]
  });

  const { control, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>();

  const handleSuccess = (NewLandlord: LandlordResult) => {
    if (NewLandlord.success) return navigation.navigate("Home");
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    postLandlord({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        zipCode: data.zipCode,
      },
      onCompleted({ NewLandlord }) { console.log(NewLandlord); NewLandlord!.success && navigation.navigate("Home"); }
    })
  }

  const onError: SubmitErrorHandler<Inputs> = data => { };

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
              {!user ? <Text style={styles.sectionText}>Must be logged in to add a Landlord</Text>
                :
                <View style={styles.form}>
                  {postData?.NewLandlord?.errors && <Text style={formStyles.error}>{postData?.NewLandlord.errors.map((e: any) => e)} </Text> /* Errors from our API */}
                  <TextField label="First Name" name="firstName" error={formErrors.firstName} control={control} rules={{ required: true }} style={styles.formItem} />
                  <TextField label="Last Name" name="lastName" error={formErrors.lastName} control={control} rules={{ required: true }} style={styles.formItem} />
                  <TextField label="Zip Code" name="zipCode" error={formErrors.zipCode} control={control} rules={{ required: true }} keyboardType="numeric" maxLength={5} style={styles.formItem} />

                  <TouchableOpacity style={[formStyles.submit, styles.submit]} onPress={handleSubmit(onSubmit, onError)}>
                    <Text style={formStyles.submitText}>Add Landlord</Text>
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
    flex: .6,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
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