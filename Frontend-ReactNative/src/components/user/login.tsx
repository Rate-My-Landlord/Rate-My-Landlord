import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { IAuthUser } from '../../types';
import { Mutation, MutationLoginArgs, Tokens } from '../../../graphql/generated';
import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ThemeColors } from '../../constants/Colors';
import TextField from '../form/TextField';
import { saveUserCredsToLocal } from '../../global/localStorage';
import React, { useContext, useState } from 'react';
import { dismissKeyboard } from '../../utils';
import formStyles from '../../Styles/styles-form';
import GoogleSignIn from './googleSignIn';
import { UserContext } from '../../global/userContext';


const LOG_IN = gql`
    mutation Login($phone: String!, $password: String!) {
        Login(phone: $phone, password: $password) {
            success,
            errors,
            tokens {
                accessToken,
                refreshToken,
            },
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
    // setUser: (user: IAuthUser) => void,
    loginExpanded: boolean,
    setLoginExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateAccountExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setExternalToken: React.Dispatch<React.SetStateAction<String | undefined>>
}

export default ({ loginExpanded: expanded, setLoginExpanded: setExpanded, setCreateAccountExpanded, setExternalToken }: Props) => {
    const { setUser } = useContext(UserContext);

    const [login, { data, loading, error }] = useMutation<Mutation, MutationLoginArgs>(LOG_IN);

    const saveUser = async (tokens: Tokens, id: string) => {
        await saveUserCredsToLocal(id, tokens.accessToken, tokens.refreshToken)
            .then(() => setUser({ accessToken: tokens.accessToken, userId: id } as IAuthUser));
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
            onCompleted({ Login }) { if (Login.tokens) saveUser(Login.tokens!, Login.user?.id!); }
        });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);

    const toggle = () => {
        setCreateAccountExpanded(false);
        setExpanded(true);
    }

    return (
        <TouchableWithoutFeedback style={formStyles.container} onPress={() => dismissKeyboard}>
            {!expanded ?
                <TouchableOpacity style={formStyles.buttonContainer} onPress={toggle}>
                    <Text style={formStyles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                :
                <View style={formStyles.container}>
                    <View style={{ flex: 1 }}>
                        <Text style={formStyles.formHeaderText}>Login</Text>
                        {data?.Login.errors && <Text style={formStyles.error}>{data?.Login.errors.map((e: any) => e)} </Text> /* Errors from our API */}
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