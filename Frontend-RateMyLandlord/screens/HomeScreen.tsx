/*
  Author: Hayden Stegman 
*/
import React from 'react';
import { StyleSheet, View, Text, Platform, useWindowDimensions } from 'react-native'

// The point at which style changes
const screenChangePoint  = 1250;

/*
  Home Screen
*/
const HomeScreen = () => {
  const windowWidth = useWindowDimensions().width;

  return (
    <>
      <View style={styles(windowWidth).headerScreen}><Text style={styles(windowWidth).textColor}>HEADER</Text></View>
      <View style={styles(windowWidth).bodyScreen}>
        <View style={styles(windowWidth).mainContainer}>
          <Text style={styles(windowWidth).textColor}>CENTER</Text>
        </View>
        
        { // Right Container Only on Web
          Platform.OS !== 'ios' && Platform.OS !== 'android' ? (
            <View style={styles(windowWidth).rightContainer}>
              <Text style={styles(windowWidth).textColor}>RIGHT</Text>
            </View>
          ):(<></>)
        }
      </View>
    </>
  );
};

export default HomeScreen;

const styles = (windowWidth : any) => StyleSheet.create({
  
  // Main Dividers of the Screen (Header from Body)
  headerScreen: {
    flex: 1,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 30 : 0,
  },
  bodyScreen: {
    flex: 10,
    flexDirection: windowWidth >= screenChangePoint ? "row" : "column",
    padding: Platform.OS === 'ios' || Platform.OS === 'android' ? 5 : 20,
    backgroundColor: '#ffffff',
  },
  
  // Body Containers
  rightContainer: {
    flex: 1,
    backgroundColor: 'red',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: '#9ca3af',
    flex: windowWidth >= screenChangePoint ? 2 : 6,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Temp
  textColor: {
    color: '#ffffff',
  }
})