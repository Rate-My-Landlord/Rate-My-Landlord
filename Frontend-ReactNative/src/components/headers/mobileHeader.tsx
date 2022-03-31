import { View, StyleSheet } from 'react-native';
import SearchBar from '../search/searchBar';
import { ThemeColors } from '../../constants/Colors';
import { isMobileDevice } from '../../utils';

export default () => (
    <View style={styles.headerScreen}>
        <SearchBar />
    </View>
)


const styles = StyleSheet.create({
    // Main Dividers of the Screen (Header from Body)
    headerScreen: {
        flex: 1,
        backgroundColor: ThemeColors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isMobileDevice() ? 40 : 0,
    },
})