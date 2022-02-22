import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { NavParamList } from '../../App'

const logo = require('../../assets/images/RateMyLandlordIcon.png');

type Props = {
    navigation: NativeStackNavigationProp<NavParamList, 'Home'> // this is not really correct
}

export default ({ navigation }: Props) => (
    <View style={styles.navBar}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
            <Text>Rate My Landlord </Text>
        </View>
        <View style={styles.searchContainer}><Text>Search</Text></View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ marginHorizontal: 20 }}>Settings</Text>
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: 75,
        height: 75
    },
    searchContainer: {
        borderColor: 'black',
        height: '60%',
        borderWidth: 3,
        borderRadius: 5,
    },
    buttonsContainer: {
        flexDirection: 'row'
    }
})