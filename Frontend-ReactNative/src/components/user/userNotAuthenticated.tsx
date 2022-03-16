import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import { IAuthUser } from '../../types';
import CreateAccount from './createAccount';
import Login from './login';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<IAuthUser | undefined>>,
    setExternalToken: React.Dispatch<React.SetStateAction<String | undefined>>
}

export default ({ setUser, setExternalToken }: Props) => {
    const [loginExpanded, setLoginExpanded] = useState<boolean>(true)
    const [createAccountExpanded, setCreateAccountExpanded] = useState<boolean>(false)


    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => { setLoginExpanded(false); setCreateAccountExpanded(false) }}>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Login
                        setUser={setUser}
                        setCreateAccountExpanded={setCreateAccountExpanded}
                        loginExpanded={loginExpanded}
                        setLoginExpanded={setLoginExpanded}
                        setExternalToken={setExternalToken}
                    />
                    <View style={styles.line} />
                    <CreateAccount
                        setUser={setUser}
                        setCreateAccountExpanded={setCreateAccountExpanded}
                        createAccountExpanded={createAccountExpanded}
                        setLoginExpanded={setLoginExpanded}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 2,
        width: '15%',
        borderTopColor: ThemeColors.darkBlue,
        borderTopWidth: 3,
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5,
        borderRadius: 5,
        margin: 5
    }
})