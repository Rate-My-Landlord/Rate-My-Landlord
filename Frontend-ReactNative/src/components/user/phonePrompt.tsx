import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import TextField from './TextField';
import { useMutation, gql } from '@apollo/client';
import { Mutation, MutationNewUserExternalArgs, UserResult } from '../../../graphql/generated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../../App';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { saveUserCredsToLocal } from '../../global/localStorage';
import { CommonActions } from '@react-navigation/native';
import { IAuthUser } from '../../types';



const NEW_USER_EXTERNAL = gql`
    mutation NewUserExternal($externalToken: String!, $provider: String!, $phone: String!) {
        NewUserExternal(externalToken: $externalToken, provider: $provider, phone: $phone) {
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
}

type Props = {
    externalToken: String,
    resetExternalToken: () => void
}


const PhonePrompt = ({ externalToken, resetExternalToken }: Props) => {
    const [newUserExternal, { loading, error, data }] = useMutation<Mutation, MutationNewUserExternalArgs>(NEW_USER_EXTERNAL)

    const handleCompleted = async (data: UserResult) => {
        if (data.token && data.user)
        await saveUserCredsToLocal(data.user!.id!, data.token!)
            .then(() => {
                resetExternalToken();
            })
    }

    // Form stuff
    const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // Form event handlers
    const onSubmit: SubmitHandler<Inputs> = data => {
        newUserExternal({
            variables: {
                externalToken: externalToken.toString(),
                provider: 'google',
                phone: data.phone.toString(),
            },
            onCompleted({ NewUserExternal }) { if (NewUserExternal.success) handleCompleted(NewUserExternal) }
        });
    };
    const onError: SubmitErrorHandler<Inputs> = data => console.warn(data);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                {loading && <Text>Submitting...</Text>}
                {error && <Text style={styles.error}>An error occurred: {error.message} </Text> /* Errors from apollo */}
                {data?.NewUserExternal.errors && <Text style={styles.error}>{data?.NewUserExternal.errors.map((e: any) => e)} </Text> /* Errors from our API */}
                <TextField label='Phone' name='phone' error={errors.phone} control={control} rules={{ required: true }} keyboardType='numeric' />
                <TouchableOpacity style={styles.submit} onPress={handleSubmit(onSubmit, onError)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submit: {
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        borderColor: ThemeColors.darkBlue,
        alignSelf: 'center'
    },
    error: {
        color: ThemeColors.red
    }
})

export default PhonePrompt;