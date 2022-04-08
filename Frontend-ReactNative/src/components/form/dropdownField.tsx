import FieldContainer, { GenericFormProps } from './fieldContainer';
import Dropdown, { DropdownProps as GenericDropDownProps } from './dropdown';

type DropdownProps = GenericFormProps & GenericDropDownProps;

export default (props: DropdownProps) => (
    <FieldContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <Dropdown {...props} hasError={props.error !== undefined} />
        )
        }
    />)