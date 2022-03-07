import { StyleSheet } from "react-native";
import { ThemeColors } from "../constants/Colors";

export default StyleSheet.create({
    scroll: {
        paddingTop: 50,
    },
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