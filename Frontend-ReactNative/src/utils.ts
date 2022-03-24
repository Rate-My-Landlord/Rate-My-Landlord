import { Keyboard, Platform, useWindowDimensions } from "react-native"
import { screenChangePoint } from "./constants/Layout";

const dismissKeyboard = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') Keyboard.dismiss()
}

const isMobileScreen = () => {
    const windowWidth = useWindowDimensions().width;

    return Platform.OS === 'ios' || Platform.OS === 'android' || windowWidth < screenChangePoint;
}

const isMobileDevice = () => {
    return Platform.OS === 'ios' || Platform.OS === 'android';
}

export { dismissKeyboard, isMobileScreen, isMobileDevice }