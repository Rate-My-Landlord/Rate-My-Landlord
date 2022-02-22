import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { useForm, SubmitHandler, Controller, Control, FieldError } from 'react-hook-form';

type TextProps = {
    label: string,
    name: 'phone' | 'email' | 'firstName' | 'lastName' | 'password' | 'confirmPassword',
    error: FieldError | undefined,
    control: Control<Inputs, any>
}

const TextField = ({ label, name, error, control }: TextProps) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <Controller
            control={control}
            rules={{
                required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value ? String(value) : ''}
                    keyboardType={name == 'phone' ? 'number-pad' : 'default'}
                />
            )}
            name={name}
        />
        {error && <Text>This field is required.</Text>}
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

export default () => {
    const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        }
    }
    );

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const dismissKeyboard = () => {
         if (Platform.OS === 'ios' || Platform.OS === 'android') Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <TextField label='Phone Number' name='phone' error={errors.phone} control={control} />
                <TextField label='Email' name='email' error={errors.email} control={control} />
                <TextField label='First Name' name='firstName' error={errors.firstName} control={control} />
                <TextField label='Last Name' name='lastName' error={errors.lastName} control={control} />
                <TextField label='Password' name='password' error={errors.password} control={control} />
                <TextField label='Confirm Password' name='confirmPassword' error={errors.confirmPassword} control={control} />


                <TouchableHighlight onPress={handleSubmit(onSubmit)}>
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
        // flex: 1,
        borderWidth: 2,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    label: {
    },
    container: {
        flex: 3,
        backgroundColor: "#D4D4D4",
        justifyContent: 'center',
        padding: 20,
        // Top Right rounded only on Web when screen is big.
        borderRadius: 15,
    },
})