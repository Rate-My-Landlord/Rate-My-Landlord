import { Control, FieldError } from 'react-hook-form';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import FormContainer, { GenericFormProps } from './formContainer';

type TextProps = GenericFormProps & {
    secureTextEntry?: boolean,
    keyboardType?: 'default' | 'numeric' | 'email-address',
    disabled?: boolean,
}

export default (props: TextProps) => (
    <FormContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={props.disabled ? styles.inputDisabled : styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={props.secureTextEntry}
                value={value ? String(value) : ''}
                keyboardType={props.keyboardType}
                editable={!props.disabled}
            />
        )} />
)

export const formHeight = 40;
export const formWidth = 250;
const styles = StyleSheet.create({
    input: {
        height: 40,
        alignItems: 'stretch',
        borderWidth: 2,
        marginVertical: 5,
        width: 250,
        borderRadius: 5,
        padding: 10,
        backgroundColor: ThemeColors.white,
    },
    inputDisabled: {
        backgroundColor: ThemeColors.darkGrey,
        height: formHeight,
        alignItems: 'stretch',
        borderWidth: 2,
        marginVertical: 5,
        width: formWidth,
        borderRadius: 5,
        padding: 10,
    },
})