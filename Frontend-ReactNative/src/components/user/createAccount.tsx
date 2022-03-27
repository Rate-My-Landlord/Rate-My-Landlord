import { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { ThemeColors } from '../../constants/Colors';
import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationNewUserArgs, Tokens } from '../../../graphql/generated';
import { IAuthUser } from '../../types';
import { saveUserCredsToLocal } from '../../global/localStorage';
import TextField from './TextField';
import { dismissKeyboard } from '../../utils';
import formStyles from '../../Styles/styles-form';
import { UserContext } from '../../global/userContext';

type Inputs = {
    phone: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
}

const ADD_USER = gql`
    mutation AddUser(
        $phone: String!,
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $password: String!) {
            NewUser(phone: $phone, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
                success,
                errors,
                user {
                    id
                },
                tokens {
                    accessToken,
                    refreshToken
                }
            }
        }
`

type Props = {
    // setUser: (user: IAuthUser) => void,
    createAccountExpanded: boolean,
    setLoginExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateAccountExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export default ({ createAccountExpanded: expanded, setCreateAccountExpanded: setExpanded, setLoginExpanded }: Props) => {
    const { setUser } = useContext(UserContext);

    const [addUser, { data, loading, error }] = useMutation<Mutation, MutationNewUserArgs>(ADD_USER);


    const saveUser = async (tokens: Tokens, id: string) => {
        await saveUserCredsToLocal(id, tokens.accessToken, tokens.refreshToken)
            .then(() => setUser({ accessToken: tokens.accessToken, userId: id } as IAuthUser));
    }

    // Form stuff
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            phone: 6,
            email: 'hayden.stegman@gmail.com',
            firstName: 'hayden',
            lastName: 'stegman',
            password: 'pw',
            confirmPassword: 'pw'
        }
    }
    );

    // Watching the value of password. We use this to make sure that the two password fields match
    const password = useRef({});
    password.current = watch('password', '');

    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = data => {
        addUser({
            variables: {
                phone: data.phone.toString(),
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            },
            onCompleted({ NewUser }) { if (NewUser) { saveUser(NewUser.tokens!, NewUser.user?.id!) } }
        });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);

    const toggle = () => {
        setExpanded(true);
        setLoginExpanded(false);
    }

    return (
        <TouchableWithoutFeedback style={formStyles.container} onPress={() => dismissKeyboard}>
            {!expanded ?
                <TouchableOpacity style={formStyles.buttonContainer} onPress={toggle}>
                    <Text style={formStyles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                : <View style={formStyles.container}>
                    {loading && <Text>Submitting...</Text>}
                    {error && <Text style={formStyles.error}>An error occurred: {error.message} </Text> /* Errors from apollo */}
                    {data?.NewUser.errors && <Text style={formStyles.error}>{data?.NewUser.errors.map((e: any) => e)} </Text> /* Errors from our API */}
                    <Text style={formStyles.formHeaderText}>Create an Account</Text>
                    <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' />
                    <TextField label='Email' name='email' error={errors.email} control={control} rules={{ required: true }} keyboardType='email-address' />
                    <TextField label='First Name' name='firstName' error={errors.firstName} control={control} rules={{ required: true }} />
                    <TextField label='Last Name' name='lastName' error={errors.lastName} control={control} rules={{ required: true }} />
                    <TextField label='Password' name='password' error={errors.password} control={control} secureTextEntry={true} rules={{ required: true }} />
                    <TextField label='Confirm Password' name='confirmPassword' error={errors.confirmPassword} control={control} secureTextEntry={true} rules={{ required: true, validate: (value: any) => value == password.current || 'Passwords do not match' }} />

                    <TouchableOpacity style={formStyles.submit} onPress={handleSubmit(onSubmit, onError)}>
                        <Text style={formStyles.submitText}>Submit</Text>
                    </TouchableOpacity>

                </View>
            }
        </TouchableWithoutFeedback>
    )
}