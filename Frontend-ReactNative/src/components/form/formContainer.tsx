import { Control, FieldError, Controller, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';

export type GenericFormProps = {
    label: string,
    name: string,
    error: FieldError | undefined,
    control: Control<any>
    rules: any,
    style?: object,
}

type FormProps = GenericFormProps & {
    render: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<any, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<any>;
    }) => React.ReactElement
}

export default ({ label, name, error, control, rules, style, render }: FormProps) => (
    <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <Controller control={control} rules={rules} render={render} name={name} />
        {error?.type === 'required' && <Text style={styles.error}>{label} is required</Text>}
        {error?.type === 'validate' && <Text style={styles.error}>{error.message}</Text>}
    </View>
)

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    label: {
    },
    error: {
        color: 'red',
    },
})