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
    setUser: (user: IAuthUser) => void,
    loginExpanded: boolean,
    setLoginExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateAccountExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    promptPhone: (externalToken: String) => void
}

export default ({ setUser, loginExpanded: expanded, setLoginExpanded: setExpanded, setCreateAccountExpanded, promptPhone }: Props) => {
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
        <TouchableWithoutFeedback style={styles.container} onPress={() => dismissKeyboard()}>
            {!expanded ?
                <TouchableOpacity style={styles.loginContainer} onPress={toggle}>
                    <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>
                :
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>Login</Text>
                        <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' />
                        <TextField label='Password' name='password' error={errors.password} control={control} rules={{ required: true }} secureTextEntry={true} />
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit(onSubmit, onError)}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <GoogleSignIn setUser={setUser} promptPhone={promptPhone} />
                </View>

            }
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderColor: ThemeColors.darkBlue,
        width: '25%',
        alignSelf: 'center'
    },
    loginContainer: {
        padding: 10,
        borderWidth: 2,
        borderColor: ThemeColors.darkBlue,
        margin: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: '25%',
        alignItems: 'center'
    },
    loginText: {
        color: ThemeColors.blue,
        fontWeight: 'bold',
        fontSize: 18,
    }
})