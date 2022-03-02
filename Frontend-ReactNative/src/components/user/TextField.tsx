import { Control, FieldError, Controller } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/Colors';


type TextProps = {
    label: string,
    name: string,
    error: FieldError | undefined,
    control: Control<any>
    rules: any,
    secureTextEntry?: boolean,
    keyboardType?: 'default' | 'numeric' | 'email-address',
    disabled?: boolean
}

export default ({ label, name, error, control, rules, secureTextEntry = false, keyboardType = 'default', disabled = false }: TextProps) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={disabled ? styles.inputDisabled : styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={secureTextEntry}
                    value={value ? String(value) : ''}
                    keyboardType={keyboardType}
                    editable={!disabled}
                />
            )}
            name={name}
        />
        {error?.type === 'required' && <Text style={styles.error}>{label} is required</Text>}
        {error?.type === 'validate' && <Text style={styles.error}>{error.message}</Text>}
    </View>
)

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
        height: 40,
        alignItems: 'stretch',
        borderWidth: 2,
        marginVertical: 5,
        width: 250,
        borderRadius: 5,
        padding: 10,
    },
    label: {
    },
    error: {
        color: 'red',
    },
})