import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { IAuthUser } from '../../types';
import { Mutation, MutationLoginArgs } from '../../../graphql/generated';
import { Control, FieldError, Controller, SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ThemeColors } from '../../constants/Colors';
import TextField from './TextField';
import { saveUserCredsToLocal } from '../../global/localStorage';
import React from 'react';
import dismissKeyboard from '../../global/dismissKeyboard';


const LOG_IN = gql`
    mutation Login($phone: String!, $password: String!) {
        Login(phone: $phone, password: $password) {
            success,
            errors,
            token,
            user {
                id
            }
        }
    }
`

type Inputs = {
    phone: number,
    password: string,
}

type Props = {
    setUser: (user: IAuthUser) => void,
}

export default ({ setUser }: Props) => {
    const [login, { data, loading, error }] = useMutation<Mutation, MutationLoginArgs>(LOG_IN);

    const saveUser = async (token: any, id: any) => {
        await saveUserCredsToLocal(id, token)
            .then(() => setUser({ token: token, user_id: id } as IAuthUser));
    }

    // Form stuff
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = data => {
        login({
            variables: {
                phone: data.phone.toString(),
                password: data.password
            },
            onCompleted({ Login }) { if (Login) { saveUser(Login.token, Login.user?.id) } }
        });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} />
                <TextField label='Password' name='password' error={errors.password} control={control} rules={{ required: true }} />
                <TouchableHighlight style={styles.submit} onPress={handleSubmit(onSubmit, onError)}>
                    <Text>Login</Text>
                </TouchableHighlight>
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: ThemeColors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // Top Right rounded only on Web when screen is big.
        borderRadius: 15,
    },
    input: {
        height: 40,
        alignItems: 'stretch',
        borderWidth: 2,
        marginVertical: 5,
        width: 250,
        borderRadius: 5,
        padding: 10,
        backgroundColor: ThemeColors.white,
    },
    title: {
        fontSize: 24
    },
    submit: {
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: ThemeColors.darkBlue
    }
})