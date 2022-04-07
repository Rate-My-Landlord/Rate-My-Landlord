import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

type Props = {
    on: boolean,
    index: number,
    setStar: (star: number) => void,
    star: number,
    style?: object
}

export type GenericStarProps = Props;

const StarField = ({ on, index, setStar }: Props) => {

    return (
        <TouchableOpacity onPress={() => setStar(index)}>
            <FontAwesome name={on ? "star" : "star-o"} size={25} />
        </TouchableOpacity>
    )
}

export default StarField;