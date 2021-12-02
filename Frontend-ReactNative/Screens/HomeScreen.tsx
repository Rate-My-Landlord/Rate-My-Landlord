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

const { brand, darkLight, primary } = Colors;

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Search'>;

/*
  Home Screen
*/
const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProp>()
  
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('../assets/RateMyLandlordIcon.png')} />
        <PageTitle>Rate My Landlord</PageTitle>
        <SubTitle>Search</SubTitle>

        <Formik
          initialValues={{search: ''}}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
            <MyTextInput 
              label="Zip Code"
              icon="search"
              defaultValue=""
              placeholder="Search by Zip Code..."
              placeholderTextColor={ darkLight }
              onChangeText={handleChange('search')}
              onBlur={handleBlur('search')}
              value={values.search}
              keyboardType="numeric"
              maxLength={5}
              returnKeyType="done"
            />
            <StyledButton
              onPress={() => navigation.navigate('Results')}
            >
              <ButtonText>
                Search
              </ButtonText>
            </StyledButton>
            <MsgBox>...</MsgBox>
            <Line />
            <MsgBox>...</MsgBox>
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