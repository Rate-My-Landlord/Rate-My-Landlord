import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import { IAuthUser } from '../../types';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { gql, useMutation } from '@apollo/client';
import { ExternalLoginResult, Mutation, MutationExternalLoginArgs } from '../../../graphql/generated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from '../../../App';

const expoGoProxyClientId = '949113263939-kpkujab0kitl565jp91b57u1mojrb0tk.apps.googleusercontent.com';
const iOSClientId = '949113263939-pftg976fc203njlr7rbevfdhn9b3ka6u.apps.googleusercontent.com';
const androidClientId = '949113263939-nnaor8s90ktpbd4g90ck1slsh5e87h4c.apps.googleusercontent.com';
const webClientId = '949113263939-317nn9jfs9p4p9uhh04pbm5o2ru2s4ur.apps.googleusercontent.com';

WebBrowser.maybeCompleteAuthSession();

const EXTERNAL_LOG_IN = gql`
    mutation ExternalLogin($externalToken: String!, $provider: String!) {
        ExternalLogin(externalToken: $externalToken, provider: $provider) {
            success,
            errors,
            token,
            user {
                id
            }
        }
    }
`


type Props = {
    setUser: (user: IAuthUser) => void,
    promptPhone: (externalToken: String) => void
}

export default ({ setUser, promptPhone }: Props) => {
    const [externalToken, setExternalToken] = useState<String | undefined>();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: expoGoProxyClientId,
        iosClientId: iOSClientId,
        androidClientId: androidClientId,
        webClientId: webClientId
    })


    const [externalLogin, { data, loading, error }] = useMutation<Mutation, MutationExternalLoginArgs>(EXTERNAL_LOG_IN);

    const handleCompleted = (data: ExternalLoginResult) => {
        console.log(data);
        if (data.token) {
            // save token and user id
        } else {
            promptPhone(externalToken!);
        }
    }


    useEffect(() => {
        if (response?.type === 'success') {
            setExternalToken(response.params.id_token);
        }
    }, [response])

    useEffect(() => {
        if (externalToken) {
            externalLogin({
                variables: {
                    externalToken: externalToken.toString(),
                    provider: 'google'
                },
                onCompleted(ExternalLogin) { handleCompleted(ExternalLogin.ExternalLogin); }
            }
            )
        }
    }, [externalToken])

    return (
        <TouchableOpacity style={styles.button} onPress={() => promptAsync()} >
            <Text>Sign in</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 10,
        borderColor: ThemeColors.blue,
        borderWidth: 2,
        borderRadius: 5
    },
    text: {

    }
})