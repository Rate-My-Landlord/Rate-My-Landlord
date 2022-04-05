import FormContainer, { GenericFormProps, GenericFormStyles } from './fieldContainer';
import Dropdown, { DropdownProps as GenericDropDownProps } from './dropdown';

type DropdownProps = GenericFormProps & GenericDropDownProps;

export default (props: DropdownProps) => (
    <FormContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown {...props} />
        )}
    />
)