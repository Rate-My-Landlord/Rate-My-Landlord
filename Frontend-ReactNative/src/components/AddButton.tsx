import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeColors } from '../constants/Colors';

type Props = {
    onPress: () => void,
    buttonText: string
}

export const AddButton = (props: Props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
            <Text style={styles.text}>{props.buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: ThemeColors.blue,
        width: '90%',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 5,
    },
    text: {
        color: ThemeColors.white,
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        textAlign: "center",
    }
})