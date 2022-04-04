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


const usStates = [
    { label: '', id: '-1' },
    { label: 'Alabama', id: 'AL' },
    { label: 'Alaska', id: 'AK' },
    { label: 'Arizona', id: 'AZ' },
    { label: 'Arkansas', id: 'AR' },
    { label: 'California', id: 'CA' },
    { label: 'Colorado', id: 'CO' },
    { label: 'Connecticut', id: 'CT' },
    { label: 'Delaware', id: 'DE' },
    { label: 'District Of Columbia', id: 'DC' },
    { label: 'Florida', id: 'FL' },
    { label: 'Georgia', id: 'GA' },
    { label: 'Hawaii', id: 'HI' },
    { label: 'Idaho', id: 'ID' },
    { label: 'Illinois', id: 'IL' },
    { label: 'Indiana', id: 'IN' },
    { label: 'Iowa', id: 'IA' },
    { label: 'Kansas', id: 'KS' },
    { label: 'Kentucky', id: 'KY' },
    { label: 'Louisiana', id: 'LA' },
    { label: 'Maine', id: 'ME' },
    { label: 'Maryland', id: 'MD' },
    { label: 'Massachusetts', id: 'MA' },
    { label: 'Michigan', id: 'MI' },
    { label: 'Minnesota', id: 'MN' },
    { label: 'Mississippi', id: 'MS' },
    { label: 'Missouri', id: 'MO' },
    { label: 'Montana', id: 'MT' },
    { label: 'Nebraska', id: 'NE' },
    { label: 'Nevada', id: 'NV' },
    { label: 'New Hampshire', id: 'NH' },
    { label: 'New Jersey', id: 'NJ' },
    { label: 'New Mexico', id: 'NM' },
    { label: 'New York', id: 'NY' },
    { label: 'North Carolina', id: 'NC' },
    { label: 'North Dakota', id: 'ND' },
    { label: 'Ohio', id: 'OH' },
    { label: 'Oklahoma', id: 'OK' },
    { label: 'Oregon', id: 'OR' },
    { label: 'Pennsylvania', id: 'PA' },
    { label: 'Rhode Island', id: 'RI' },
    { label: 'South Carolina', id: 'SC' },
    { label: 'South Dakota', id: 'SD' },
    { label: 'Tennessee', id: 'TN' },
    { label: 'Texas', id: 'TX' },
    { label: 'Utah', id: 'UT' },
    { label: 'Vermont', id: 'VT' },
    { label: 'Virginia', id: 'VA' },
    { label: 'Washington', id: 'WA' },
    { label: 'West Virginia', id: 'WV' },
    { label: 'Wisconsin', id: 'WI' },
    { label: 'Wyoming', id: 'WY' },
]

export { dismissKeyboard, isMobileScreen, isMobileDevice, isNumberKey, getRatingColor, usStates }