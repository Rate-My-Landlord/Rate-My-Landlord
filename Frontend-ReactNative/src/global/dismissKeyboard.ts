import { Keyboard, Platform } from "react-native"

export default () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') Keyboard.dismiss()
}