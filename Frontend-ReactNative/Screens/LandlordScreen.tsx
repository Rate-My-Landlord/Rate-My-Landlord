/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';

type landlordScreenProp = StackNavigationProp<RootStackParamList, 'Landlord'>;

/* 
  Landlord Screen
*/
function LandlordScreen() {
    const navigation = useNavigation<landlordScreenProp>();
        return (
        <View style={styles.container}>
        <Text>Landlord Page</Text>
        <StatusBar style="auto" />

        <Button
            title="Go Back"
            onPress={() =>
            navigation.navigate('Results')
            }
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
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandlordScreen;