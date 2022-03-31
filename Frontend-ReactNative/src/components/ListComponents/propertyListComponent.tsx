import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { ThemeColors } from '../../constants/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from '../../../App';
import { Property } from '../../../graphql/generated';

type Props = {
    property: Property
}

export const PropertyComponent = ({ property }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<NavParamList, "Home">>();

    return (
        <View style={styles.propertyContainer}>
            <Text style={styles.address}>{property.address1}</Text>
            <Text style={styles.detailAddress}>{property.city}, {property.state}, {property.zipCode}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reviews', { landlordId: property.landlord.id })}>
                <View style={styles.reviewPageButton}><FontAwesome name="arrow-right" size={30} color={ThemeColors.darkBlue} /></View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    propertyContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: ThemeColors.darkGrey,
        borderWidth: 2,
        backgroundColor: ThemeColors.blue,
        marginVertical: 5,
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    address: {
        color: ThemeColors.white,
        fontWeight: 'bold',
        fontSize: 20,
        flex: 2,
        textAlign: "center",
    },
    detailAddress: {
        color: ThemeColors.white,
        fontWeight: 'bold',
        fontSize: 10,
        flex: 1,
        textAlign: "center",
    },
    reviewPageButton: {
        flex: 1,
        backgroundColor: ThemeColors.white,
        borderRadius: 5,
        alignItems: 'center',
        padding: 5,
        borderColor: ThemeColors.darkGrey,
        borderWidth: 2,
        width: 45,
    },
})