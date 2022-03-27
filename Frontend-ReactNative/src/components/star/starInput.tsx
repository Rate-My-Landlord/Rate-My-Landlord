import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StarField from './starField';

type Props = {
    star: number,
    setStar: (str: number) => void
}

const StarInput = ({star, setStar}: Props) => {

    return (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((i) => <StarField key={i} on={i <= star} index={i} setStar={setStar} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row'
    },
})

export default StarInput