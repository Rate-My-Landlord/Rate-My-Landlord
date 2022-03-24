import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text, TouchableOpacity, View, Image, StyleSheet, Button } from 'react-native'
import { NavParamList } from '../../../App';
import { ThemeColors } from '../../constants/Colors';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const logo = require('../../../assets/images/RateMyLandlordIcon.png');

type Props = {
    zipCode: string
}

export default ({ zipCode }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<NavParamList>>()

    // Loads Font
    let [fontsLoaded] = useFonts({
        'BebasNeue-Regular': require('../../../assets/fonts/BebasNeue-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.navBar}>
            {/* Rate My Landlord Logo / home button */}
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo} />
                    <Text style={styles.headerText}>RATE MY LANDLORD</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.spacer} />

            {/* Search Bar Section */}
            <View style={styles.searchContainer}>
                <Text>{zipCode}</Text>
                <View style={styles.searchBar}><Text style={styles.searchText}>Search</Text></View>
            </View>

            <View style={styles.spacer} />

            {/* Profile and Settings Section */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Overall Container
    navBar: {
        flexDirection: 'row',
        backgroundColor: ThemeColors.white,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    // Three Sections of Header
    homeButton: {
        flex: 3,
        //backgroundColor: ThemeColors.darkBlue,
    },
    searchContainer: {
        flex: 8,
        height: '100%',
        //backgroundColor: ThemeColors.red
    },
    buttonsContainer: {
        flex: 2,
        alignItems: 'center',
        //backgroundColor: ThemeColors.orange
    },

    // Spacer for Main Sections
    spacer: {
        backgroundColor: ThemeColors.darkBlue,
        flex: 1,
    },

    // Sub Containers / Elements
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
    },
    logo: {
        width: 75,
        height: 75
    },
    searchBar: {
        borderRadius: 15,
        backgroundColor: ThemeColors.grey,
        paddingHorizontal: 15,
        marginHorizontal: 100,
        marginVertical: 10,
        flex: 1,
    },
    headerText: {
        color: ThemeColors.blue,
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: "BebasNeue-Regular",
        lineHeight: 25,
    },
    searchText: {
        color: ThemeColors.darkBlue,
        fontWeight: 'bold',
    },
    navText: {
        fontFamily: "BebasNeue-Regular",
        fontWeight: 'bold',
        fontSize: 30,
        color: ThemeColors.blue,
        marginRight: 10,
    },
})