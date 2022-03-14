import { StyleSheet } from "react-native";
import { ThemeColors } from "../constants/Colors";

export default StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // Top Right rounded only on Web when screen is big.
        borderRadius: 5,
        width: '75%',
    },
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
    title: {
        fontSize: 24
    },
    error: {
        color: 'red',
    },
    errorTop: {
        marginBottom: 3,
        fontSize: 18
    },
    formHeaderText: {
        color: ThemeColors.blue,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },

    // Submit Button
    submit: {
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        marginVertical: 10,
        borderColor: ThemeColors.darkBlue,
        backgroundColor: ThemeColors.blue,
    },
    submitText: {
        color: ThemeColors.white,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    
    // Standard Buttons
    buttonContainer: {
        padding: 10,
        borderWidth: 2,
        borderColor: ThemeColors.darkBlue,
        margin: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: '25%',
        alignItems: 'center',
        backgroundColor: ThemeColors.blue
    },
    buttonText: {
        color: ThemeColors.white,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },

    // Profile Update and Logout
    feedback: {
        color: ThemeColors.green,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    logout: {
        padding: 10,
        borderWidth: 2,
        borderColor: ThemeColors.darkBlue,
        margin: 5,
        borderRadius: 5,
        alignSelf: 'center',
        width: '25%',
        alignItems: 'center',
        backgroundColor: ThemeColors.red
    },
})