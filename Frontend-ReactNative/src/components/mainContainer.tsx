import { View, Platform, Text } from 'react-native';
import Header from './headers/header';
import { screenChangePoint } from '../constants/Layout';
import pageStyles from '../Styles/styles-page';
import widthDepStyles from '../Styles/styles-width-dep';
import { isMobileScreen } from '../utils';

type Props = {
    windowWidth: number,
    children: JSX.Element
}

export default ({ windowWidth, children }: Props) => (
    <View style={pageStyles.backgroundScreen}>
        <Header windowWidth={windowWidth} />
        <View style={widthDepStyles(windowWidth).bodyScreen}>
            {/* Main Content Container */}
            <View style={widthDepStyles(windowWidth).mainContainer}>
                {children}
            </View>
            { // Right Container Only on Web and when screen is big
                isMobileScreen() && (
                    <View style={pageStyles.rightContainer}>
                        <Text style={pageStyles.textColor}>Ad Space?</Text>
                    </View>
                )
            }
        </View>
    </View>
)