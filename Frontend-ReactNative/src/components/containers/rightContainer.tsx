import { View, StyleSheet } from 'react-native';

type Props = {
    children: JSX.Element,
    style?: object
}

const RightContainer = ({ children, style }: Props) => (
    <View style={[styles.containerRight, style]}>
        {children}
    </View>
)

const styles = StyleSheet.create({
    containerRight: {
        flex: 3
    },
})

export default RightContainer;