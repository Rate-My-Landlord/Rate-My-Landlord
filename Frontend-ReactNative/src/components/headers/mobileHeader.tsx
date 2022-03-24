import { View, Text, StyleSheet, Platform } from 'react-native';
import { SearchBar } from 'react-native-screens';
import { ThemeColors } from '../../constants/Colors';
import { useSearchContext } from '../../global/searchContext';
import { isMobileDevice } from '../../utils';

type Props = {
    windowWidth: number,
}

export default ({ windowWidth }: Props) => {
    const { zipCode } = useSearchContext();

    return (<View style={styles(windowWidth).headerScreen}>
        <SearchBar />
        {/* <Text>{zipCode}</Text>
        <Text style={styles(windowWidth).textColor}>Rate My Landlord</Text> */}
    </View>
    )
}


const styles = (windowWidth: number) => StyleSheet.create({
    // Main Dividers of the Screen (Header from Body)
    headerScreen: {
        flex: 1,
        backgroundColor: ThemeColors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isMobileDevice() ? 40 : 0,

        // Header Gap - Only on Web
        margin: isMobileDevice() ? 0 : 5,

        // Rounded Corners - All 4 on Web, Bottom 2 on IOS/Andriod
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderRadius: isMobileDevice() ? 0 : 15,

        // Shadow
    },
    textColor: {
        color: ThemeColors.darkBlue,
    },
})