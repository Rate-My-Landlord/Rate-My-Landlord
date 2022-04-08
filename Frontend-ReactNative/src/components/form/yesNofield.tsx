import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FieldContainer, { GenericFormProps, GenericFormStyles } from './fieldContainer';
import { ThemeColors } from '../../constants/Colors';

type Props = GenericFormProps & {
    setChoice: (on: boolean) => void
}

const YesNoField = (props: Props) => (
    <View></View>
)

const styles = StyleSheet.create({
    container: {
        ...GenericFormStyles,
    }
})

export default YesNoField;