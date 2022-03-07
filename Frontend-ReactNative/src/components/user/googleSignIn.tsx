import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, BackHandler } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import { IAuthUser } from '../../types';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const expoGoProxyClientId = '949113263939-kpkujab0kitl565jp91b57u1mojrb0tk.apps.googleusercontent.com';
const iOSClientId = '949113263939-pftg976fc203njlr7rbevfdhn9b3ka6u.apps.googleusercontent.com';
const androidClientId = '949113263939-nnaor8s90ktpbd4g90ck1slsh5e87h4c.apps.googleusercontent.com';
const webClientId = '949113263939-317nn9jfs9p4p9uhh04pbm5o2ru2s4ur.apps.googleusercontent.com';

WebBrowser.maybeCompleteAuthSession();


type Props = {
    setUser: (user: IAuthUser) => void,
}

export default ({ setUser }: Props) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expoGoProxyClientId,
        iosClientId: iOSClientId,
        androidClientId: androidClientId,
        webClientId: webClientId
    })
    const [token, setToken] = useState<String | undefined>();


    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            setToken(authentication?.accessToken)
            console.log(response);
        }
    }, [response])


    async function getUserData() {
        let userInfoRes = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
        userInfoRes.json().then(res => console.log(res))
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => promptAsync()} >
            <Text>Sign in</Text>
            <TouchableOpacity onPress={() => getUserData()} >
                <Text>Hi</Text>
            </TouchableOpacity>
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