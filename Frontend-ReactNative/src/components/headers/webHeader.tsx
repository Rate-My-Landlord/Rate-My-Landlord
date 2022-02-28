import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
// import { NavParamList } from '../../../App'
import { NavParamList } from '../../../App';
import { ThemeColors } from '../../constants/Colors';

const logo = require('../../../assets/images/RateMyLandlordIcon.png');

type Props = {
    windowWidth: number
}

export default ({ windowWidth }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<NavParamList>>()

    return (
        <View style={styles.navBar}>
            {/* Rate My Landlord Logo / home button */}
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo} />
                    <Text style={styles.headerText}>Rate My Landlord </Text>
                </View>
            </TouchableOpacity>

            <View style={styles.spacer} />

            {/* Search Bar Section */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}><Text style={styles.searchText}>Search</Text></View>
            </View>

            <View style={styles.spacer} />

            {/* Profile and Settings Section */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Text style={{ marginHorizontal: 20 }}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Overall Container
    navBar: {
        flexDirection: 'row',
        backgroundColor: ThemeColors.grey,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    // Three Sections of Header
    homeButton: {
        flex: 3,
    },
    searchContainer: {
        flex: 10,
        height: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flex: 2,
    },

    // Spacer for Main Sections
    spacer: {
        backgroundColor: ThemeColors.darkBlue,
        flex: 2,
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
        backgroundColor: ThemeColors.white,
        paddingHorizontal: 15,
        marginHorizontal: 100,
        marginVertical: 10,
        flex: 1,
    },
    headerText: {
        color: ThemeColors.darkBlue,
        fontWeight: 'bold',
        fontSize: 20,
    },
    searchText: {
        color: ThemeColors.darkBlue,
        fontWeight: 'bold',
    }
})