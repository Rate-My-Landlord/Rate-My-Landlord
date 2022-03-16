import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { IAuthUser } from '../../types';
import { Mutation, MutationLoginArgs } from '../../../graphql/generated';
import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ThemeColors } from '../../constants/Colors';
import TextField from './TextField';
import { saveUserCredsToLocal } from '../../global/localStorage';
import React, { useState } from 'react';
import dismissKeyboard from '../../global/dismissKeyboard';
import formStyles from '../../Styles/styles-form';
import GoogleSignIn from './googleSignIn';


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
    setUser: React.Dispatch<React.SetStateAction<IAuthUser | undefined>>
    loginExpanded: boolean,
    setLoginExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateAccountExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setExternalToken: React.Dispatch<React.SetStateAction<String | undefined>>
}

export default ({ setUser, loginExpanded: expanded, setLoginExpanded: setExpanded, setCreateAccountExpanded, setExternalToken }: Props) => {
    const [login, { data, loading, error }] = useMutation<Mutation, MutationLoginArgs>(LOG_IN);

    const saveUser = async (token: any, id: any) => {
        await saveUserCredsToLocal(id, token)
            .then(() => setUser({ token: token, user_id: id } as IAuthUser));
    }

    // Form stuff
    const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();

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

    const toggle = () => {
        setCreateAccountExpanded(false);
        setExpanded(true);
    }

    return (
        <TouchableWithoutFeedback style={formStyles.container} onPress={() => dismissKeyboard()}>
            {!expanded ?
                <TouchableOpacity style={formStyles.buttonContainer} onPress={toggle}>
                    <Text style={formStyles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                :
                <View style={formStyles.container}>
                    <View style={{ flex: 1 }}>
                        <Text style={formStyles.formHeaderText}>Login</Text>
                        <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' />
                        <TextField label='Password' name='password' error={errors.password} control={control} rules={{ required: true }} secureTextEntry={true} />
                        <TouchableOpacity style={formStyles.submit} onPress={handleSubmit(onSubmit, onError)}>
                            <Text style={formStyles.submitText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <GoogleSignIn setUser={setUser} setExternalToken={setExternalToken} />
                </View>

            }
        </TouchableWithoutFeedback>
    )

}