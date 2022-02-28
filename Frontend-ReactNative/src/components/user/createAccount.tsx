import { useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { ThemeColors } from '../../constants/Colors';
import { gql, useMutation } from '@apollo/client';
import { Mutation, MutationNewUserArgs } from '../../../graphql/generated';
import { IAuthUser } from '../../types';
import { saveUserCredsToLocal } from '../../global/localStorage';
import TextField from './TextField';
import dismissKeyboard from '../../global/dismissKeyboard';

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
                token
            }
        }
`

type Props = {
    setUser: (user: IAuthUser) => void,
}

export default ({ setUser }: Props) => {
    const [addUser, { data, loading, error }] = useMutation<Mutation, MutationNewUserArgs>(ADD_USER);


    const saveUser = async (token: any, id: any) => {
        await saveUserCredsToLocal(id, token)
            .then(() => setUser({ token: token, user_id: id } as IAuthUser));
    }

    // Form stuff
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            // phone: '5089880446',
            email: 'em',
            firstName: 'fn',
            lastName: 'ln',
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
            onCompleted({ NewUser }) { if (NewUser) { saveUser(NewUser.token, NewUser.user?.id) } }
        });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.container}>
                {loading && <Text>Submitting...</Text>}
                {error && <Text style={styles.error}>An error occurred: {error.message} </Text> /* Errors from apollo */}
                {data?.NewUser.errors && <Text style={styles.error}>{data?.NewUser.errors.map((e: any) => e)} </Text> /* Errors from our API */}
                <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' />
                <TextField label='Email' name='email' error={errors.email} control={control} rules={{ required: true }} keyboardType='email-address' />
                <TextField label='First Name' name='firstName' error={errors.firstName} control={control} rules={{ required: true }} />
                <TextField label='Last Name' name='lastName' error={errors.lastName} control={control} rules={{ required: true }} />
                <TextField label='Password' name='password' error={errors.password} control={control} secureTextEntry={true} rules={{ required: true }} />
                <TextField label='Confirm Password' name='confirmPassword' error={errors.confirmPassword} control={control} secureTextEntry={true} rules={{ required: true, validate: (value: any) => value == password.current || 'Passwords do not match' }} />


                <TouchableHighlight style={styles.submit} onPress={handleSubmit(onSubmit, onError)}>
                    <Text>Submit</Text>
                </TouchableHighlight>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // Top Right rounded only on Web when screen is big.
    },
    error: {
        color: 'red',
    },
    errorTop: {
        marginBottom: 3,
        fontSize: 18
    },
    submit: {
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: ThemeColors.darkBlue
    }
})