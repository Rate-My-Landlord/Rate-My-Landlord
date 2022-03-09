import { StyleSheet, Platform } from "react-native";
import { ThemeColors } from "../constants/Colors";
import { screenChangePoint } from "../constants/Layout";

// Styles Dependant on the Width of the Window
export default (windowWidth: number) => StyleSheet.create({
        mainContainer: {
            marginHorizontal: 0,
            borderRadius: 15,
            flex: 3,
            flexDirection: windowWidth >= screenChangePoint ? 'row-reverse' : 'column-reverse',
            justifyContent: 'center',
            backgroundColor: ThemeColors.white
        },
        bodyScreen: {
            flex: 10,
            flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
            paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 15,
            paddingHorizontal: (Platform.OS === 'ios' || Platform.OS === 'android') || windowWidth <= screenChangePoint ? 5 : '10%',
            backgroundColor: ThemeColors.darkGrey,
        },
})