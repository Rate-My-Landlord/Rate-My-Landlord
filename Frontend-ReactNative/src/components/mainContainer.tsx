import { View, StyleSheet } from 'react-native';
import Header from './headers/header';

type Props = {
    windowWidth: number,
    children: JSX.Element
}

export default ({ windowWidth, children }: Props) => (
    <View style={styles.backgroundScreen}>
        <Header windowWidth={windowWidth} />
        {children}
    </View>
)


const styles = StyleSheet.create({
    // Back Ground Contain
    backgroundScreen: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
})