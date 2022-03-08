import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import { IAuthUser } from '../../types';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { gql, useMutation } from '@apollo/client';
import { UserResult, Mutation, MutationExternalLoginArgs, User } from '../../../graphql/generated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from '../../../App';
import { saveUserCredsToLocal } from '../../global/localStorage';


const googleLogo = require('../../../assets/images/googleLogo.png');

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

    const handleCompleted = async (data: UserResult) => {
        if (data.token) {
            await saveUserCredsToLocal(data.user!.id, data.token)
                .then(() => setUser({ token: data.token!, user_id: data.user!.id } as IAuthUser));

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
            <View style={styles.googleButton}>
                <Image source={googleLogo} style={styles.googleLogo} />
                <Text style={styles.text}>Continue with Google</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 5,
        padding: 5,
        borderColor: ThemeColors.darkBlue,
        borderWidth: 2,
        borderRadius: 5
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    googleLogo: {
        height: 20,
        width: 20,
    },
    text: {
        paddingStart: 10,
        fontWeight: '500'
    }
})