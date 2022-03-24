import { Image, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import starStyles from "../../Styles/styles-star";

type Props = {
    on: boolean,
    index: number,
    setStar: (star: number) => void,
}

const StarField = ({ on, index, setStar }: Props) => {

    return (
        <TouchableOpacity onPress={() => setStar(index)}>
            <FontAwesome name={on ? "star" :"star-o"} size={25} />
        </TouchableOpacity>
    )
}

export default StarField;