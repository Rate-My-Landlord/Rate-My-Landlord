import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StarField from './starField';

type Props = {
    star: number,
    setStar: (str: number) => void,
    style?: Object
}

const StarInput = ({star, setStar, style}: Props) => {

    return (
        <View style={[styles.starContainer, style && style]}>
            {[1, 2, 3, 4, 5].map((i) => <StarField key={i} on={i <= star} index={i} setStar={setStar} star={i} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row'
    },
})

export default StarInput