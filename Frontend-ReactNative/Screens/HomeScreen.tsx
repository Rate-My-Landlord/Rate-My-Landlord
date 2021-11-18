/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

/* 
  Home Screen
*/
function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Page Heading */}
      <Text>Showing all Landlords from '05401'</Text>
      <StatusBar style="auto" />

      {/* List of Landlords */}
      <LandlordWidget name='Chris' rating='1.7/5 Stars'/>
      <LandlordWidget name='Mark' rating='4.2/5 Stars'/>
      <LandlordWidget name='Charlie'rating='4.4/5 Stars'/>
      <LandlordWidget name='Sarah' rating='2.3/5 Stars'/>
      <LandlordWidget name='Carlie' rating='4.9/5 Stars'/>
    </View>
  );
};

{/* 
  Widget added to list for each landlord present in area.
  Features:
    - Name
    - 1-5 Star Rating
    - Button to go to landlord page
*/}
const LandlordWidget = ( props:any ) => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <View style={{ backgroundColor: 'rgba(90,90,90,0.14)', padding: 10, margin: 2, width: '80%'}}>
      <Text>{props.name}</Text>
      <Text>{props.rating}</Text>
      <Button
        title={props.name + "'s Reviews"}
        onPress={() => navigation.navigate('Landlord')}
      />
    </View>
  );
};

/*
    Style Sheet
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;