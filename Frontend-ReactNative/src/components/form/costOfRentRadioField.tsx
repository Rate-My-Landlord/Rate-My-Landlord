import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CostOfRentRating } from '../../../graphql/generated';
import { ThemeColors } from '../../constants/Colors';
import FieldContainer, { GenericFormProps, GenericFormStyles } from './fieldContainer';

type Props = GenericFormProps & {
    setSelected: (item: CostOfRentRating) => void,
}

const CostOfRentRadioField = (props: Props) => (
    <FieldContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.item, styles.itemLeft, value === CostOfRentRating.Cheap ? styles.itemSelected : undefined]}
                    onPress={() => props.setSelected(CostOfRentRating.Cheap)}
                >
                    <Text style={styles.itemText}>{CostOfRentRating.Cheap}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.item, styles.itemCenter, value === CostOfRentRating.Fair ? styles.itemSelected : undefined]}
                    onPress={() => props.setSelected(CostOfRentRating.Fair)}
                >
                    <Text style={styles.itemText}>{CostOfRentRating.Fair}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.item, styles.itemRight, value === CostOfRentRating.Pricy ? styles.itemSelected : undefined]}
                    onPress={() => props.setSelected(CostOfRentRating.Pricy)}
                >
                    <Text style={styles.itemText}>{CostOfRentRating.Pricy}</Text>
                </TouchableOpacity>
            </View>
        )}
    />
)

const styles = StyleSheet.create({
    container: {
        ...GenericFormStyles,
        borderWidth: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
    },
    itemLeft: {
        backgroundColor: ThemeColors.green,
        borderWidth: 2,
        borderEndWidth: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    itemCenter: {
        backgroundColor: ThemeColors.orange,
        borderWidth: 2,
        borderEndWidth: 0,
        borderStartWidth: 0,
    },
    itemRight: {
        backgroundColor: ThemeColors.red,
        borderWidth: 2,
        borderStartWidth: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    itemSelected: {
        borderTopWidth: 4,
        borderBottomWidth: 4,
        borderStartWidth: 4,
        borderEndWidth: 4
    },
    itemText: {
        textAlign: 'center',
        color: ThemeColors.white,
        fontWeight: 'bold'
    }
})

export default CostOfRentRadioField;