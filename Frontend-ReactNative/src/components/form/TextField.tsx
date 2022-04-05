import { TextInput, StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import FormContainer, { GenericFormProps, GenericFormStyles } from './fieldContainer';

type TextProps = GenericFormProps & {
    secureTextEntry?: boolean,
    keyboardType?: 'default' | 'numeric' | 'email-address',
    disabled?: boolean,
    maxLength?: number,
}

export default (props: TextProps) => (
    <FormContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={[GenericFormStyles, props.disabled ? styles.inputDisabled : undefined]}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={props.secureTextEntry}
                value={value ? String(value) : ''}
                keyboardType={props.keyboardType}
                editable={!props.disabled}
                maxLength={props.maxLength ? props.maxLength : undefined}
            />
        )} />
)

const styles = StyleSheet.create({
    inputDisabled: {
        backgroundColor: ThemeColors.darkGrey,
    },
})