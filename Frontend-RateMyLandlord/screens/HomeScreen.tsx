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
        
        {/* Main Content Container */}
        <View style={styles(windowWidth).mainContainer}>
          <View style={styles(windowWidth).listContainer}>
            <Text style={styles(windowWidth).textColor}>List Container</Text>
          </View>

          <View style={styles(windowWidth).listControlContainer}>
            <Text style={styles(windowWidth).textColor}>List Controler</Text>
          </View>
        </View>
        
        { // Right Container Only on Web and when screen is big
          (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? (
            <View style={styles(windowWidth).rightContainer}>
              <Text style={styles(windowWidth).textColor}>Ad Space?</Text>
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
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0,
  },
  bodyScreen: {
    flex: 10,
    flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 15,
    paddingHorizontal: (Platform.OS === 'ios' || Platform.OS === 'android') ? 0 : '10%',
    backgroundColor: '#ffffff',
  },
  
  // Body Containers
  rightContainer: {
    flex: 1,
    marginHorizontal: 10,
    
    //Temp for Visibility
    backgroundColor: 'red',

    // Temp for Text Viewing
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {

    // Change FlexBox valuse based on screen size
    marginHorizontal: 10,
    
    // Flex Settings
    flex: 3,
    flexDirection: windowWidth >= screenChangePoint ? 'row-reverse' : 'column-reverse',
  },

  // Content Containers
  listContainer: {
    flex: windowWidth >= screenChangePoint ? 2 : 5,
    backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Contains Filter box, buttons, ect.
  listControlContainer: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Temp
  textColor: {
    color: '#ffffff',
  }
})