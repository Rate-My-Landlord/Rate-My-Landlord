import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Mutation, MutationUpdateUserArgs, Query, QueryUserByUserIdArgs } from '../../../graphql/generated';
import TextField from './TextField';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { saveUserCredsToLocal } from '../../global/localStorage';
import { ThemeColors } from '../../constants/Colors';

const UPDATE_USER = gql`
    mutation UpdateUser($phone: String, $email: String, firstName: String, lastName: String) {
        UpdateUser(phone: $phone, email: $email, firstName: $firstName, lastName: $lastName) {
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
    const { loading, data } = useQuery<Query, QueryUserByUserIdArgs>(GET_USER_BY_ID, { variables: { userId: userId } });

    const [updateUser, { loading: m_loading, data: m_data, error: m_error }] = useMutation<Mutation, MutationUpdateUserArgs>(UPDATE_USER);


    // Updating user token on device
    if (data?.UserByUserId.token !== undefined) {
        if (data?.UserByUserId.user?.id! !== userId) {
            throw new Error('User ids do not match');
        } else {
            // Not using setUser from UserCOntext because then it will infinitely rerender 
            saveUserCredsToLocal(data?.UserByUserId.user?.id!, data?.UserByUserId.token!)
        }

    }

    // Form stuff
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();


    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = data => { console.log(data) };

    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);


    if (loading) return <Text>Loading...</Text>

    return (
        <View>
            {m_error && <Text style={styles.error}>An error occurred: {m_error.message} </Text> /* Errors from apollo */}
            {m_data?.UpdateUser.errors && <Text style={styles.error}>{m_data?.UpdateUser.errors.map((e: any) => e)} </Text> /* Errors from our API */} */}
            <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' />
            <TextField label='Email' name='email' error={errors.email} control={control} rules={{ required: true }} keyboardType='email-address' />
            <TextField label='First Name' name='firstName' error={errors.firstName} control={control} rules={{ required: true }} />
            <TextField label='Last Name' name='lastName' error={errors.lastName} control={control} rules={{ required: true }} />

            <TouchableHighlight style={styles.submit} onPress={handleSubmit(onSubmit, onError)}>
                <Text>Update</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
    },
    label: {
        flex: .5
    },
    error: {

    },
    submit: {
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: ThemeColors.darkBlue
    }
})