import { Control, FieldError, Controller, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../../constants/Colors';

export type GenericFormProps = {
    label: string,
    name: string,
    error: FieldError | undefined,
    control: Control<any>
    rules?: object,
    style?: object,
}

type FormProps = GenericFormProps & {
    render: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<any, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<any>;
    }) => React.ReactElement
}

export default ({ label, name, error, control, rules, style, render }: FormProps) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <Controller control={control} rules={rules} render={render} name={name} />
            {error !== undefined &&
                <View style={styles.errorContainer}>
                    {error?.type === 'required' && <Text style={styles.errorMessage}>{label} is required</Text>}
                    {error?.type === 'validate' && <Text style={styles.errorMessage}>{error.message}</Text>}
                </View>
            }
        </View>
    )
}

export const formHeight = 40;
export const formWidth = 250;

export const GenericFormStyles = {
    flex: .1,
    height: formHeight,
    borderWidth: 2,
    borderColor: ThemeColors.darkBlue,
    marginVertical: 5,
    width: formWidth,
    borderRadius: 5,
    padding: 10,
    backgroundColor: ThemeColors.white,
}

export const ErrorBorder = {
    borderColor: ThemeColors.red
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        flex: .5,
    },
    errorContainer: {
        flexDirection: 'column',
        flex: 1
    },
    errorMessage: {
        flex: .5,
        color: ThemeColors.red,
    },
})