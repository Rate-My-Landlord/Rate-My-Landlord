import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { isMobileScreen } from '../../utils';

type Props = {
    children: JSX.Element,
    style?: object
}

const LeftContainer = ({ children, style }: Props) => {
    const windowWidth = useWindowDimensions().width;

    return (
        <View style={[styles.containerRight, isMobileScreen(windowWidth) && { flex: .5 }, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    containerRight: {
        flex: 1
    },
})

export default LeftContainer;