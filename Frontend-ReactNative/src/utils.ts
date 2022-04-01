import { Keyboard, Platform } from "react-native"
import { ThemeColors } from "./constants/Colors";
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

function getRatingColor(rating: number): string {
    if (rating <= 2) {
        return ThemeColors.red;
    } else if (rating <= 3.5) {
        return ThemeColors.orange;
    } else {
        return ThemeColors.green
    }
}

export { dismissKeyboard, isMobileScreen, isMobileDevice, isNumberKey, getRatingColor }