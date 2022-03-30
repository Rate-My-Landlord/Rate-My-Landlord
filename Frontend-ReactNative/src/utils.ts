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

const isNumberKey = (e: any) => {
    var charCode = (e.which) ? e.which : e.keyCode
    if (charCode > 31 && (charCode !== 46 && (charCode < 48 || charCode > 57))) {
        e.preventDefault();
        return false;
    }
    return true;
}

export { dismissKeyboard, isMobileScreen, isMobileDevice, isNumberKey }