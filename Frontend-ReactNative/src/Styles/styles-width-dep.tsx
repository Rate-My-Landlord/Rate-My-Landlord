import { StyleSheet, Platform } from "react-native";
import { ThemeColors } from "../constants/Colors";
import { screenChangePoint } from "../constants/Layout";
import { isMobileDevice, isMobileScreen } from "../utils";

// Styles Dependant on the Width of the Window
export default (windowWidth: number) => StyleSheet.create({
    mainContainer: {
        marginHorizontal: 0,
        borderRadius: 5,
        flex: 3,
        flexDirection: windowWidth >= screenChangePoint ? 'row-reverse' : 'column',
        justifyContent: 'center',
        backgroundColor: ThemeColors.white
    },
    bodyScreen: {
        flex: 10,
        flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
        paddingTop: isMobileDevice() ? 10 : 15,
        paddingHorizontal: isMobileScreen(windowWidth) ? 5 : '10%',
        backgroundColor: ThemeColors.darkGrey,
    },
    // Content Containers
    listContainer: {
        flex: windowWidth >= screenChangePoint ? 2 : 5,
        backgroundColor: ThemeColors.white,
        justifyContent: 'center',
        alignItems: 'center',

        // Top Right rounded only on Web when screen is big.
        borderTopRightRadius: !isMobileScreen(windowWidth) ? 5 : 0,
    },
    // Contains Filter box, buttons, ect.
    listControlContainer: {
        flex: 1,
        backgroundColor: ThemeColors.grey,
        paddingTop: 20,
        alignItems: 'center',

        // Top Right only rounded when on IOS or Screen is small
        borderTopRightRadius: !isMobileScreen(windowWidth) ? 0 : 5,
        borderTopLeftRadius: 5,
    },
    // Header for Reviews Page
    reviewsPageHeader: {
        backgroundColor: ThemeColors.blue,
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        // Top Right rounded only on Web when screen is big.
        borderTopRightRadius: !isMobileScreen(windowWidth) ? 5 : 0,
    }
})