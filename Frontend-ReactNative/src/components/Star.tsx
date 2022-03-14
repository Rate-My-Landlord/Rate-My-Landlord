import React from "react";
import{ FontAwesome } from '@expo/vector-icons'
import { View } from "react-native";
import starStyles from "../Styles/styles-star";


export const Star = ( props:any ) => {
    let { rating } = props

    return (
        <View style={starStyles.starContainer}>
            {[1,2,3,4,5].map((num, key) => num<=rating ? 
            <FontAwesome key={key} name="star" size={25} style={starStyles.starItems}/> : // whole star
                (num-1<rating ? 
                    <FontAwesome key={key} name="star-half-empty" size={25} /> : // half
                    <FontAwesome key={key} name="star-o" size={25} /> // empty
                ))}
        </View>
    )
}