import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import FieldContainer, { GenericFormProps, GenericFormStyles } from './fieldContainer';

export type RadioItem<ValueType> = {
    value: ValueType,
    label: string,
    style: ViewStyle,
}

type Props<ValueType> = GenericFormProps & {
    setSelected: (item: ValueType) => void,
    items: RadioItem<ValueType>[]
}

const RadioField = <ValueType,>(props: Props<ValueType>) => (
    <FieldContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.container}>
                {props.items.map((item, key) => (
                    <TouchableOpacity key={key}
                        style={[styles.item, item.style,
                        key === 0 ? styles.itemStart :
                            key === props.items.length - 1 ? styles.itemEnd : styles.itemCenter,

                        item.value === value ? styles.itemSelected : undefined]}
                        onPress={() => props.setSelected(item.value)}
                    >
                        <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
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
    },
    itemStart: {
        borderWidth: 2,
        borderEndWidth: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    itemCenter: {
        borderWidth: 2,
        borderEndWidth: 0,
        borderStartWidth: 0,
    },
    itemEnd: {
        borderWidth: 2,
        borderStartWidth: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
})

export default RadioField;