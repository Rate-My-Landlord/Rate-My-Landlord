import React from "react";
import { Colors, StarContainer } from "./styles";
import{ FontAwesome } from '@expo/vector-icons'
const { brand, darkLight, primary } = Colors;


export const Star = ( props:any ) => {
    let { rating } = props

    return (
        <StarContainer>
            {[1,2,3,4,5].map(num => num<=rating ? 
            <FontAwesome name="star" color={brand} size={20} /> : // whole star
                (num-1<rating ? 
                    <FontAwesome name="star-half-empty" color={brand} size={20} /> : // half
                    <FontAwesome name="star-o" color={brand} size={20} /> // empty
                ))}
        </StarContainer>
    )

}