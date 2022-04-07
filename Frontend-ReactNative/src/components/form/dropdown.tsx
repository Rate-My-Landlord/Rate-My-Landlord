import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ThemeColors } from '../../constants/Colors';
import { GenericFormStyles } from './fieldContainer';

export type Item = {
    label: string,
    value: string
}

export type DropdownProps = {
    items: Array<Item>,
    setChoice: (choice: Item) => void,
}

const Dropdown = ({ items, setChoice, hasError }: DropdownProps & { hasError?: boolean }) => (
    <RNPickerSelect
        placeholder={{}}
        onValueChange={(_, index) => setChoice(items[index])}
        style={!hasError ? { ...pickerStyles } : { ...pickerErrorStyles }}
        items={items}
    />
)

const defaultPickerStyles = {
    ...GenericFormStyles,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 30, // to ensure the text is never behind the icon
};

const pickerStyles = StyleSheet.create({
    inputWeb: defaultPickerStyles,
    inputIOS: defaultPickerStyles,
    inputAndroid: defaultPickerStyles,
});

const errorStyles = {
    ...defaultPickerStyles,
    borderColor: ThemeColors.red
}

const pickerErrorStyles = StyleSheet.create({
    inputWeb: errorStyles,
    inputIOS: errorStyles,
    inputAndroid: errorStyles,
})

export default Dropdown;