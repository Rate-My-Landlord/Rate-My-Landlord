import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Mutation, MutationUpdateUserArgs, Query, QueryUserByUserIdArgs } from '../../../graphql/generated';
import TextField from './TextField';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { resetCreds, saveUserCredsToLocal } from '../../global/localStorage';
import { ThemeColors } from '../../constants/Colors';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { IAuthUser } from '../../types';
import dismissKeyboard from '../../global/dismissKeyboard';
import formStyles from '../../Styles/styles-form';

const UPDATE_USER = gql`
    mutation UpdateUser($email: String, $firstName: String, $lastName: String) {
        UpdateUser(email: $email, firstName: $firstName, lastName: $lastName) {
            success
        }
    }

`

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        UserByUserId(userId: $userId) {
            success,
            errors,
            user {
                id,
                firstName,
                lastName,
                email,
                phone
            },
            tokens {
                accessToken,
                refreshToken
            },
        }
    }
`

type Inputs = {
    phone: number,
    email: string,
    firstName: string,
    lastName: string
}

type Props = {
    userId: string,
    setUser: (user: IAuthUser | undefined) => void,
}

export default ({ userId, setUser }: Props) => {
    const [feedback, setFeedback] = useState<string | undefined>(undefined);
    const { loading, data } = useQuery<Query, QueryUserByUserIdArgs>(GET_USER_BY_ID, { variables: { userId: userId } });

    const [updateUser, { loading: m_loading, data: m_data, error: m_error }] = useMutation<Mutation, MutationUpdateUserArgs>(UPDATE_USER);

    // Form stuff
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        if (data) {
            // Setting default values in text field once we get the data
            reset({
                phone: parseInt(data!.UserByUserId.user?.phone!),
                email: data!.UserByUserId.user?.email!,
                firstName: data!.UserByUserId.user?.firstName!,
                lastName: data!.UserByUserId.user?.lastName!
            })

            // Updating user token on device
            if (data?.UserByUserId.tokens !== undefined) {
                if (data?.UserByUserId.user?.id! !== userId) {
                    throw new Error('User ids do not match');
                } else {
                    // Not using setUser from UserCOntext because then it will infinitely rerender 
                    saveUserCredsToLocal(data?.UserByUserId.user?.id!, data?.UserByUserId.tokens?.accessToken!, data?.UserByUserId.tokens?.refreshToken!)
                }
            }
        }
    }, [data])

    let defaultValues = {};
    if (data) {
        defaultValues = {
            phone: data!.UserByUserId.user?.phone!,
            email: data!.UserByUserId.user?.email!,
            firstName: data!.UserByUserId.user?.firstName!,
            lastName: data!.UserByUserId.user?.lastName!
        }
    }

    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = new_info => {
        let variables = {};

        if (new_info.email !== data!.UserByUserId.user?.email) Object.assign(variables, { email: new_info.email });
        if (new_info.firstName !== data!.UserByUserId.user?.firstName) Object.assign(variables, { firstName: new_info.firstName });
        if (new_info.lastName !== data!.UserByUserId.user?.lastName) Object.assign(variables, { lastName: new_info.lastName });

        if (Object.keys(variables).length > 0) {
            updateUser({
                variables: variables,
                onCompleted() { setFeedback('Profile updated') }
            }
            )
        }
    };

    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);

    const logout = () => resetCreds().then(() => setUser(undefined));


    if (loading) return (<Text>Loading...</Text>)

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                <Text style={formStyles.formHeaderText}>Edit your profile</Text>
                <View>
                    {feedback && <Text style={formStyles.feedback}>{feedback} </Text>/* Feedback from updating profile */}
                    {m_error && <Text style={formStyles.error}>An error occurred: {m_error.message} </Text>/* Errors from apollo */}
                    {m_data?.UpdateUser.errors && <Text style={formStyles.error}>{m_data?.UpdateUser.errors.map((e: any) => e)} </Text>/* Errors from our API */}
                    <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' disabled={true} />
                    <TextField label='Email' name='email' error={errors.email} control={control} rules={{ required: true }} keyboardType='email-address' />
                    <TextField label='First Name' name='firstName' error={errors.firstName} control={control} rules={{ required: true }} />
                    <TextField label='Last Name' name='lastName' error={errors.lastName} control={control} rules={{ required: true }} />

                    <TouchableOpacity style={formStyles.submit} onPress={handleSubmit(onSubmit, onError)}>
                        <Text style={formStyles.submitText}>Update</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={formStyles.logout} onPress={logout}>
                    <Text style={formStyles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}