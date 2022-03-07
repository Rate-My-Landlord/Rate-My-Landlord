import { StyleSheet } from "react-native";
import { ThemeColors } from "../constants/Colors";

export default StyleSheet.create({
    // Back Ground Container - Holds all
    backgroundScreen: {
        backgroundColor: ThemeColors.white,
        flex: 1,
    },
    // Right Ad Container for potential Ad Space - (Web Only)
    rightContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 15,

        // Temp?
        backgroundColor: ThemeColors.grey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        color: ThemeColors.darkBlue,
    },
})