import { View, Text, Platform, StyleSheet } from "react-native";
import WebHeader from "./webHeader";
import MobileHeader from "./mobileHeader";
import { screenChangePoint } from '../../constants/Layout';

type Props = {
    windowWidth: number
}

export default ({ windowWidth }: Props) => (
    (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? (
        <WebHeader windowWidth={windowWidth} />
    ) : (
        <MobileHeader windowWidth={windowWidth} />
    )
)