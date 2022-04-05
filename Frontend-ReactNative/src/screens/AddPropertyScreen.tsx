import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NavParamList } from '../../App';
import formStyles from '../Styles/styles-form';
import widthDepStyles from '../Styles/styles-width-dep';
import pageStyles from '../Styles/styles-page';
import { AddButton } from '../components/AddButton';
import LeftContainer from '../components/containers/leftContainer';
import MainContainer from '../components/containers/mainContainer';
import RightContainer from '../components/containers/rightContainer';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isMobileDevice, isMobileScreen, usStates } from '../utils';
import { UserContext } from '../global/userContext';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Mutation, MutationNewPropertyArgs, Query, QueryLandlordByIdArgs } from '../../graphql/generated';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '../components/form/TextField';
import Dropdown, { Item } from '../components/form/dropdown';
import DropdownField from '../components/form/dropdownField';

const emptyState = { label: 'Select a state', value: '-1' };

type Inputs = {
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
}

type Props = NativeStackScreenProps<NavParamList, "AddProperty">;

const ADD_PROPERTY = gql`
    mutation NewProperty( $landlordId: ID!,
        $address1: String!, $address2: String,
        $city: String!, $zipCode: String!,
        $state: String!, $country: String! ) {
            NewProperty(
                landlordId: $landlordId,
                address1: $address1,
                address2: $address2,
                city: $city,
                zipCode: $zipCode,
                state: $state,
                country: $country
                ) {
                    success,
                    errors
                }
        }
`

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

const AddPropertyScreen = ({ route, navigation }: Props) => {
    const windowWidth = useWindowDimensions().width;
    const { user } = useContext(UserContext);
    const { loading, error, data } = useQuery<Query, QueryLandlordByIdArgs>(GET_LANDLORD, { variables: { landlordId: route.params.landlordId } });
    const [addProperty, { data: postData, error: postError, loading: postLoading }] = useMutation<Mutation, MutationNewPropertyArgs>(ADD_PROPERTY, {
        refetchQueries: () => [{
            query: GET_LANDLORD,
            variables: {
                landlordId: route.params.landlordId
            }
        }]
    });


    const { control, handleSubmit, formState: { errors: formErrors }, setError, clearErrors } = useForm<Inputs>();
    const [selectedState, setSelectedState] = useState<Item>(emptyState);
    const states = [emptyState].concat(usStates);

    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = data => {
        if (selectedState.value === emptyState.value) {
            setError('state', { type: 'required' })
            return;
        }
        if (data.zipCode.length !== 5) {
            setError('zipCode', { type: 'validate', message: 'Zip Code is invalid' });
            return;
        }
        clearErrors();
        addProperty({
            variables: {
                landlordId: route.params.landlordId,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                zipCode: data.zipCode,
                state: selectedState.value,
                country: 'US'
            },
            onCompleted({ NewProperty }) { NewProperty.success && navigation.navigate("Reviews", { landlordId: route.params.landlordId }) }
        })
    };
    const onError: SubmitErrorHandler<Inputs> = data => { };

    return (
        <MainContainer>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

                <View style={[styles.container, isMobileScreen(windowWidth) && { flexDirection: 'column-reverse' }]}>
                    <LeftContainer style={widthDepStyles(windowWidth).listControlContainer}>
                        <AddButton buttonText={"Go Back"} onPress={() => navigation.navigate("Reviews", { landlordId: route.params.landlordId })} />
                    </LeftContainer>
                    <RightContainer>
                        <>
                            <View style={widthDepStyles(windowWidth).reviewsPageHeader}>
                                <Text style={pageStyles.whiteHeaderText}>Add a property for {data?.LandlordById.landlord?.firstName}</Text>
                            </View>
                            {!user ? <Text style={styles.sectionText}>Must be logged in to add a property</Text>
                                :
                                <View style={styles.form}>
                                    {error && <Text style={formStyles.error}>An error occurred: {error.message} </Text> /* Errors from apollo */}
                                    {postData?.NewProperty.errors && <Text style={formStyles.error}>{postData?.NewProperty.errors.map((e: any) => e)} </Text> /* Errors from our API */}
                                    <TextField label='Address' name="address1" error={formErrors.address1} control={control} rules={{ required: true }} style={styles.formItem} />
                                    <TextField label='Address 2 (optional)' name="address2" error={formErrors.address2} control={control} style={styles.formItem} />
                                    <TextField label='City' name="city" error={formErrors.city} control={control} rules={{ required: true }} style={styles.formItem} />
                                    <DropdownField label='State' name='state' error={formErrors.state} control={control} items={states} setChoice={setSelectedState} />
                                    <TextField label='Zip Code' name="zipCode" error={formErrors.zipCode} control={control} rules={{ required: true }} style={styles.formItem} keyboardType="numeric" maxLength={5} />

                                    <TouchableOpacity style={[formStyles.submit, styles.submit]} onPress={handleSubmit(onSubmit, onError)}>
                                        <Text style={formStyles.submitText}>Add Property</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </>
                    </RightContainer>
                </View>
            </KeyboardAwareScrollView>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
    },
    form: {
        flex: .6,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
    },
    formItem: {
        flex: 1,
    },
    sectionText: {
        flex: 3,
    },
    submit: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: .1,
        width: 200,
        marginHorizontal: 'auto',
    }
})



export default AddPropertyScreen;