import { View, Text, useWindowDimensions } from 'react-native';
import Header from './headers/header';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { isMobileScreen } from '../utils';

type Props = {
    children: JSX.Element
}

export default ({ children }: Props) => {
    const windowWidth = useWindowDimensions().width;

    return (
        <View style={pageStyles.backgroundScreen}>
            <Header windowWidth={windowWidth} />
            <View style={widthDepStyles(windowWidth).bodyScreen}>
                {/* Main Content Container */}
                <View style={widthDepStyles(windowWidth).mainContainer}>
                    {children}
                </View>
                { // Right Container Only on Web and when screen is big
                    !isMobileScreen(windowWidth) && (
                        <View style={pageStyles.rightContainer}>
                            <Text style={pageStyles.textColor}>Ad Space?</Text>
                        </View>
                    )
                }
            </View>
        </View>
    )
}