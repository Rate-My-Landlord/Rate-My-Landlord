import { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { useForm, SubmitHandler, Controller, Control, FieldError, RegisterOptions, SubmitErrorHandler } from 'react-hook-form';
import { ThemeColors } from '../constants/Colors';
import { gql, useMutation } from '@apollo/client';
import { IUserResult, IUser } from '../types';

type TextProps = {
    label: string,
    name: 'phone' | 'email' | 'firstName' | 'lastName' | 'password' | 'confirmPassword',
    error: FieldError | undefined,
    control: Control<Inputs, any>
    rules: any,
    secureTextEntry?: boolean
}

const TextField = ({ label, name, error, control, rules, secureTextEntry = false }: TextProps) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={secureTextEntry}
                    value={value ? String(value) : ''}
                    keyboardType={name == 'phone' ? 'number-pad' : 'default'}
                />
            )}
            name={name}
        />
        {error?.type === 'required' && <Text style={styles.error}>{label} is required</Text>}
        {error?.type === 'validate' && <Text style={styles.error}>{error.message}</Text>}
    </View>
)



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



export default () => {
    const [addUser, { data, loading, error }] = useMutation(ADD_USER);


    const saveUserToDevice = (token: string, id: string) => {
        console.log(token, id);
    }

    // Form stuff
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            phone: '5089880446',
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
        console.log(data.phone, data.firstName, data.lastName, data.email, data.password);
        addUser({
            variables: {
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            },
            onCompleted({ addUser }) {console.log(addUser.token)}//{saveUserToDevice(addUser.token, addUser.user.id)}
        });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.log(data);

    // For dismissing the keyboard in mobile when they touch anywhere but the text box
    const dismissKeyboard = () => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') Keyboard.dismiss()
    }

    console.log(data?.NewUser);

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                {loading && <Text>Submitting...</Text>}
                {error && <Text style={styles.error}>An error occurred: {error.message} </Text> /* Errors from apollo */}
                {data?.NewUser.errors && <Text style={styles.error}>{data?.NewUser.errors.map((e: string) => e)} </Text> /* Errors from our API */}
                <Text style={[styles.error, styles.errorTop]}>Phone number already in use</Text>
                <TextField label='Phone Number' name='phone' error={errors.phone} control={control} rules={{ required: true }} />
                <TextField label='Email' name='email' error={errors.email} control={control} rules={{ required: true }} />
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
    label: {
    },
    container: {
        flex: 3,
        backgroundColor: ThemeColors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // Top Right rounded only on Web when screen is big.
        borderRadius: 15,
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