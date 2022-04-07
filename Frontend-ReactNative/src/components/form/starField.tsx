import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormContainer, { GenericFormProps } from '../form/fieldContainer';
import { FontAwesome } from '@expo/vector-icons'

type StarProps = {
    on: boolean,
    index: number,
    setStar: (star: number) => void
}


const Star = (props: StarProps) => (
    <TouchableOpacity onPress={() => props.setStar(props.index)}>
        <FontAwesome name={props.on ? "star" : "star-o"} size={25} />
    </TouchableOpacity>
)


type StarFieldProps = GenericFormProps & {
    setStar: (star: number) => void,
    style?: object
}

const StarInput = (props: StarFieldProps) => (
    <FormContainer {...props}
        render={({ field: { onChange, onBlur, value } }) => (
            <View style={[styles.starContainer, props.style && props.style]}>
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} on={i <= value} index={i} setStar={props.setStar} />)}
            </View>
        )}
    />
)

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row'
    },
})

export default StarInput