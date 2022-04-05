import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { GenericFormStyles } from './fieldContainer';

export type Item = {
    label: string,
    value: string
}

export type DropdownProps = {
    items: Array<Item>,
    setChoice: (choice: Item) => void
}

const Dropdown = ({ items, setChoice }: DropdownProps) => (
    <RNPickerSelect
        placeholder={{}}
        onValueChange={(value, index) => setChoice(items[index])}
        style={{ ...customPickerStyles }}
        items={items}
    />
)

const defaultPickerStyles = Object.assign({
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 30, // to ensure the text is never behind the icon
}, GenericFormStyles);

const customPickerStyles = StyleSheet.create({
    inputWeb: defaultPickerStyles,
    inputIOS: defaultPickerStyles,
    inputAndroid: defaultPickerStyles,
});

export default Dropdown;