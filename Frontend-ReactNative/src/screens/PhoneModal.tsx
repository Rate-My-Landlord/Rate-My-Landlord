import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/Colors';
import TextField from '../components/user/TextField';
import { useMutation, gql } from '@apollo/client';
import { Mutation } from '../../graphql/generated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../../App';

type Props = NativeStackScreenProps<NavParamList, "PhoneModal">;


const PhoneModal = ({ route, navigation }: Props) => {


    return (
        <View style={styles.container}>
            <Text>Hi</Text>
            <Text>{route.params.externalToken}</Text>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default PhoneModal;