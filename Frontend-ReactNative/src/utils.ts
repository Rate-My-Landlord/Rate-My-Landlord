import { Keyboard, Platform } from "react-native"
import { screenChangePoint } from "./constants/Layout";

const dismissKeyboard = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') Keyboard.dismiss()
}

const isMobileScreen = (windowWidth: number) => {
    return Platform.OS === 'ios' || Platform.OS === 'android' || windowWidth < screenChangePoint;
}

const isMobileDevice = () => {
    return Platform.OS === 'ios' || Platform.OS === 'android';
}

export { dismissKeyboard, isMobileScreen, isMobileDevice }