import React from "react";
import{ FontAwesome } from '@expo/vector-icons'
import { View } from "react-native";


export const Star = ( props:any ) => {
    let { rating } = props

    return (
        <View>
            {[1,2,3,4,5].map(num => num<=rating ? 
            <FontAwesome name="star" size={20} /> : // whole star
                (num-1<rating ? 
                    <FontAwesome name="star-half-empty" size={20} /> : // half
                    <FontAwesome name="star-o" size={20} /> // empty
                ))}
        </View>
    )

}