import React from "react";
import { FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet } from "react-native";

type Props = {
    rating: number
}

const starSize = 25;

export const Star = ({ rating }: Props) => (
    <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(num =>
            <FontAwesome
                key={num}
                style={styles.star}
                name={num <= rating ? "star" : num - 1 < rating ? "star-half-empty" : "star-o"}
            />
        )}
    </View>
)

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    star: {
        flex: 1,
        fontSize: starSize,
    }
})