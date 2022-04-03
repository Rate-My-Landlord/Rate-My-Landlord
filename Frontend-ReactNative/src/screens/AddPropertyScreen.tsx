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
import React, { useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isMobileScreen } from '../utils';
import { UserContext } from '../global/userContext';
import { gql, useQuery } from '@apollo/client';
import { Query, QueryLandlordByIdArgs } from '../../graphql/generated';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '../components/form/TextField';

type Inputs = {
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
}

type Props = NativeStackScreenProps<NavParamList, "AddProperty">;


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


    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = data => {
        // addUser({
        //     variables: {
        //         phone: data.phone.toString(),
        //         firstName: data.firstName,
        //         lastName: data.lastName,
        //         email: data.email,
        //         password: data.password
        //     },
        //     onCompleted({ NewUser }) { if (NewUser.tokens) { saveUser(NewUser.tokens!, NewUser.user?.id!) } }
        // });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);


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
                            {!user ? <Text style={styles.sectionText}>Must be logged in to post reviews</Text>
                                :
                                <View style={styles.form}>
                                    <TextField label='Address' name="address1" error={errors.address1} control={control} rules={{ required: true }} />
                                    <TextField label='Address 2 (optional)' name="address2" error={errors.address2} control={control} rules={{}} />
                                    <TextField label='City' name="city" error={errors.city} control={control} rules={{ required: true }} />
                                    <TextField label='State' name="state" error={errors.state} control={control} rules={{ required: true }} />
                                    <TextField label='Country' name="country" error={errors.country} control={control} rules={{ required: true }} />


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
        flex: .5,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
    },
    sectionText: {

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