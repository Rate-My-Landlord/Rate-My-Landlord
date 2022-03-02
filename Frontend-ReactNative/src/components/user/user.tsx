import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Mutation, MutationUpdateUserArgs, Query, QueryUserByUserIdArgs } from '../../../graphql/generated';
import TextField from './TextField';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { saveUserCredsToLocal } from '../../global/localStorage';
import { ThemeColors } from '../../constants/Colors';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

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
            token,
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
    userId: string
}

export default ({ userId }: Props) => {
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
            if (data?.UserByUserId.token !== undefined) {
                if (data?.UserByUserId.user?.id! !== userId) {
                    throw new Error('User ids do not match');
                } else {
                    // Not using setUser from UserCOntext because then it will infinitely rerender 
                    saveUserCredsToLocal(data?.UserByUserId.user?.id!, data?.UserByUserId.token!)
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


    if (loading) return (<Text>Loading...</Text>)

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit your profile</Text>
            </View>
            <View style={styles.form}>
                {feedback && <Text style={styles.feedback}>{feedback} </Text>/* Feedback from updating profile */}
                {m_error && <Text style={styles.error}>An error occurred: {m_error.message} </Text>/* Errors from apollo */}
                {m_data?.UpdateUser.errors && <Text style={styles.error}>{m_data?.UpdateUser.errors.map((e: any) => e)} </Text>/* Errors from our API */}
                <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' disabled={true} />
                <TextField label='Email' name='email' error={errors.email} control={control} rules={{ required: true }} keyboardType='email-address' />
                <TextField label='First Name' name='firstName' error={errors.firstName} control={control} rules={{ required: true }} />
                <TextField label='Last Name' name='lastName' error={errors.lastName} control={control} rules={{ required: true }} />

                <TouchableHighlight style={styles.submit} onPress={handleSubmit(onSubmit, onError)}>
                    <Text>Update</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        marginVertical: 5,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    form: {

    },
    feedback: {
        color: ThemeColors.green,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    error: {
        color: ThemeColors.red
    },
    submit: {
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        width: '45%',
        textAlign: 'center',
        alignSelf: 'center',
        borderColor: ThemeColors.darkBlue
    }
})