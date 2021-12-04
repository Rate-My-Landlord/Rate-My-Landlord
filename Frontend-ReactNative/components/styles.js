/*
  Author: Hayden Stegman
*/
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

// Colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#60ACBD",
    green: "#10B981",
    red: "#EF4444"
};

const {primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled(View)`
    flex: 1;
    padding: 25px;
    padding-top: 65px;
    background-color: ${primary};
`;

export const InnerContainer = styled(View)`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled(Image)`
    width: 250px;
    height: 200px;
`;

export const PageTitle = styled(Text)`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`;

export const SubTitle = styled(Text)`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled(View)`
    width: 90%;
`;

export const StyledTextInput = styled(TextInput)`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 10px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled(Text)`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled(View)`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled(TouchableOpacity)`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    align-items: center;

    ${(props) => props.google == true && `
        background-color: ${red};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled(Text)`
    color: ${primary}
    font-size: 16px;

    ${(props) => props.google == true && `
        padding-left: 25px;
    `}
`;

export const MsgBox = styled(Text)`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ListItemContainer = styled(View)`
    width: 100%;
    background-color: ${secondary};
    border-radius: 10px;
    margin-vertical: 5px;
    padding: 10px;
`;

export const InlineContainter = styled(View)`
    flex-direction: row;
`;

export const ListTitle = styled(Text)`
    font-size: 18px;
    margin-bottom: 0px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    
    ${(props) => props.center == true && `
        text-align: center;
    `}
`;

export const StarContainer = styled(View)`
    flex-direction: row;
    position: absolute;
    right: 0px;
`;

export const ReviewMsgBox = styled(Text)`
    font-size: 13px;
`;