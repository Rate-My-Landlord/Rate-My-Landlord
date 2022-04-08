import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import FieldContainer, { GenericFormProps, GenericFormStyles, ErrorBorder } from './fieldContainer';

type TextProps = GenericFormProps & {
    textInputProps?: TextInputProps
}

export default (props: TextProps) => (
    <FieldContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={[
                    GenericFormStyles,
                    props.textInputProps?.editable === false ? styles.inputDisabled : undefined,
                    props.error ? ErrorBorder : undefined,
                    props.textInputProps?.multiline !== undefined ? styles.multiline : undefined
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? String(value) : ''}
                {...props.textInputProps}
            />
        )} />
)

const styles = StyleSheet.create({
    inputDisabled: {
        backgroundColor: ThemeColors.darkGrey,
    },
    multiline: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        height: 70,
        overflow: 'hidden'
    }
})