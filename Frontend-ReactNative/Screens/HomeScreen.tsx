/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'react-native'

// Icons
import{ Octicons, Fontisto } from '@expo/vector-icons'

// Form Handeler
import { Formik } from 'formik';

// Styles
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line
} from '../components/styles';

// Colors
const { brand, darkLight, primary } = Colors;

// Navigation Prop
type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Search'>;

/*
  Home Screen
*/
const HomeScreen = ({ navigation: { navigate }}) => {
  // const navigation = useNavigation<HomeScreenProp>()
  
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        
        {/* Page Logo, Title, and Subtitle */}
        <PageLogo resizeMode="cover" source={require('../assets/RateMyLandlordIcon.png')} />
        <PageTitle>Rate My Landlord</PageTitle>
        <SubTitle>Search</SubTitle>

        {/* Start of Form */}
        <Formik
          initialValues={{
            search: ''
          }}
          onSubmit={(values) => {
            const ZipCode = values.search;
            console.log(ZipCode);
            navigate('Results', { zipcode: values.search});
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values}) => (
          <StyledFormArea>
            {/* Text Input Parameters for Search Bar */}
            <MyTextInput 
              label="Zip Code"
              icon="search"
              defaultValue=""
              placeholder="Search by Zip Code..."
              placeholderTextColor={ darkLight }
              onChangeText={ handleChange('search') }
              onBlur={ handleBlur('search') }
              value={values.search}
              keyboardType="numeric"
              maxLength={ 5 }
              returnKeyType="done"
            />

            {/* Button for submitting form/search data */}
            <StyledButton onPress={handleSubmit} type="submit">
              <ButtonText>
                Search
              </ButtonText>
            </StyledButton>

            {/* Page Break between search and logins */}
            <MsgBox>...</MsgBox>
            <Line />
            <MsgBox>...</MsgBox>

            {/* Login and Google Login Buttons | TO BE IMPLEMENTED */}
            <StyledButton>
              <ButtonText>Login</ButtonText>
            </StyledButton>
            <StyledButton google={true}>
              <Fontisto name="google" color={ primary } size={ 25 } />
              <ButtonText google={true}>Sign in with Google</ButtonText>
            </StyledButton>

          </StyledFormArea>)}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

// Search Bar Component
const MyTextInput = ( props:any ) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={ props.icon } size={ 30 } color={ brand } />
      </LeftIcon>
      <StyledInputLabel> {props.label} </StyledInputLabel>
      <StyledTextInput { ...props } />
    </View>
  );
}

export default HomeScreen;