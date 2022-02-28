import { View, StyleSheet, Platform, Text } from 'react-native';
import Header from './headers/header';
import { screenChangePoint } from '../constants/Layout';
import { ThemeColors } from '../constants/Colors';

type Props = {
    windowWidth: number,
    children: JSX.Element
}

export default ({ windowWidth, children }: Props) => (
    <View style={styles(windowWidth).backgroundScreen}>
        <Header windowWidth={windowWidth} />
        <View style={styles(windowWidth).bodyScreen}>
            {/* Main Content Container */}
            <View style={styles(windowWidth).mainContainer}>
                {children}
            </View>
            { // Right Container Only on Web and when screen is big
                (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint && (
                    <View style={styles(windowWidth).rightContainer}>
                        <Text style={styles(windowWidth).textColor}>Ad Space?</Text>
                    </View>
                )
            }
        </View>
    </View>
)


const styles = (windowWidth: number) => StyleSheet.create({
    // Back Ground Contain
    backgroundScreen: {
        backgroundColor: ThemeColors.white,
        flex: 1,
    },
    mainContainer: {
        marginHorizontal: 0,
        backgroundColor: ThemeColors.grey,
        // justifyContent: 'center',
        // alignItems: 'center',
        // Top Right rounded only on Web when screen is big.
        borderRadius: 15,

        // Flex Settings
        flex: 3,
        flexDirection: windowWidth >= screenChangePoint ? 'row-reverse' : 'column-reverse',
        justifyContent: 'center'
    },
    bodyScreen: {
        flex: 10,
        flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
        paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 15,
        paddingHorizontal: (Platform.OS === 'ios' || Platform.OS === 'android') || windowWidth <= screenChangePoint ? 5 : '10%',
        backgroundColor: ThemeColors.white,
    },
    // Body Containers (Right Ad Space (Web Only) and Main Container)
    rightContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,

        //Temp for Visibility
        backgroundColor: ThemeColors.grey,

        // Temp for Text Viewing
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 15,
    },
    textColor: {
        color: ThemeColors.darkBlue,
    },

})