import React from "react";
import{ FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet } from "react-native";


export const Star = ( props:any ) => {
    let { rating } = props

    return (
        <View style={starStyles().starContainer}>
            {[1,2,3,4,5].map((num, key) => num<=rating ? 
            <FontAwesome key={key} name="star" size={20} style={starStyles().starItems}/> : // whole star
                (num-1<rating ? 
                    <FontAwesome key={key} name="star-half-empty" size={20} /> : // half
                    <FontAwesome key={key} name="star-o" size={20} /> // empty
                ))}
        </View>
    )
}

const starStyles = () => StyleSheet.create({
    starItems: {
        flex: 1,
    },
    starContainer: {
        flexDirection: 'row',
    }
})