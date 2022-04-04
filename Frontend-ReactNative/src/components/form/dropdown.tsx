import { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, useWindowDimensions } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { isMobileScreen } from '../../utils';

type ItemProps = {
    onPress: (item: any) => void,
    item: Item,
}

const Item = ({ onPress, item }: ItemProps) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.itemText}>{item.longerLabel ? item.longerLabel : item.label}</Text>
    </TouchableOpacity>
)

export type Item = {
    label: string,
    longerLabel?: string,
    id: string
}

export type DropdownProps = {
    items: Array<Item>,
    choice: Item,
    setChoice: (choice: Item) => void
    style?: object,
}

// Reference for some of the things here: https://blog.logrocket.com/creating-custom-react-native-dropdown/
const Dropdown = ({ items, choice, setChoice, style }: DropdownProps) => {
    const windowWidth = useWindowDimensions().width;
    const DropdownButton = useRef();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [dropdownTop, setDropdownTop] = useState<number>(0);

    const toggleDropdown = () => expanded ? setExpanded(false) : openDropdown();

    const openDropdown = (): void => {
        // @ts-ignore - ignoring errors
        DropdownButton.current?.measure((_fx: number, _fy: number, _w: number, _h: number, _px: number, _py: number) => {
            setDropdownTop(_py + _h);
        });
        setExpanded(true);
    }

    const onItemPress = (item: Item): void => {
        setChoice(item);
        setExpanded(false);
    }

    return (
        // @ts-ignore - ignoring errors
        <TouchableOpacity ref={DropdownButton} onPress={toggleDropdown} style={[styles.container, style]} >
            <Modal visible={expanded} transparent animationType="none">
                <TouchableOpacity style={isMobileScreen(windowWidth) ? styles.overlayMobile : styles.overlayDesktop} onPress={() => setExpanded(false)}>
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                            data={items}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={(item) => <Item item={item.item} onPress={() => onItemPress(item.item)} />}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={styles.choice}>
                <Text style={styles.choiceText}>{choice.label}</Text>
                <AntDesign style={styles.caret} name={expanded ? "caretup" : "caretdown"} size={20} color="black" />
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ThemeColors.grey,
        zIndex: 1,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 5,
        padding: 10,
        marginHorizontal: 20,
    },
    choice: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
        margin: 0,
    },
    choiceText: {
        flex: 3,
        fontWeight: 'bold',
        fontSize: 20
    },
    caret: {
        flex: .5,
        textAlign: 'right'
    },
    dropdown: {
        // position: 'absolute',
        marginVertical: 5,
        padding: 10,
        marginHorizontal: 20,
        backgroundColor: ThemeColors.grey,
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    overlayDesktop: {
        width: '30%',
        height: '30%',
        alignSelf: 'center'
    },
    overlayMobile: {
        width: '90%',
        height: '90%',
        paddingBottom: 500,
    },
    items: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        margin: 5,
        marginStart: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 15
    }
})

export default Dropdown;