/*
  Author: Hayden Stegman 
*/
import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform, useWindowDimensions, FlatList } from 'react-native';

// The point at which style changes
const screenChangePoint  = 1250;

/*
  Home Screen
*/
const HomeScreen = () => {
  const windowWidth = useWindowDimensions().width;

  // Temp DATA for testing!
  const [landlords, setLandlords] = useState([
    { name: "John Harple", key: "1" },
    { name: "Quiggly Jim", key: "2" },
    { name: "Sarah Lark", key: "3" },
    { name: "Tommy Name", key: "4" },
    { name: "That Guy", key: "5" },
    { name: "A Sheep", key: "6" },
    { name: "A Cow", key: "7" },
    { name: "A Duck", key: "8" },
    { name: "A Dog", key: "9" },
  ]);

  return (
    <View style={styles(windowWidth).backgroundScreen}>
      <View style={styles(windowWidth).headerScreen}><Text style={styles(windowWidth).textColor}>HEADER</Text></View>
      <View style={styles(windowWidth).bodyScreen}>
        
        {/* Main Content Container */}
        <View style={styles(windowWidth).mainContainer}>
          <View style={styles(windowWidth).listContainer}>
            <FlatList style={styles(windowWidth).flatList}
              data={landlords}
              renderItem={({ item }) => (
                <View style={styles(windowWidth).listItemContainer}>
                  <Text style={styles(windowWidth).listTextColor}>{item.name}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
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
    </View>
  );
};

export default HomeScreen;


// Page Styles
const styles = (windowWidth : any) => StyleSheet.create({
  // Back Ground Contain
  backgroundScreen: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  
  // Main Dividers of the Screen (Header from Body)
  headerScreen: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 40 : 0,

    // Header Gap - Only on Web
    margin: Platform.OS === 'ios' || Platform.OS === 'android' ? 0 : 5,

    // Rounded Corners - All 4 on Web, Bottom 2 on IOS/Andriod
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderRadius: Platform.OS === 'ios' || Platform.OS === 'android' ? 0 : 15,

    // Shadow
  },
  bodyScreen: {
    flex: 10,
    flexDirection: windowWidth >= screenChangePoint ? "row" : "column-reverse",
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 15,
    paddingHorizontal: (Platform.OS === 'ios' || Platform.OS === 'android') ? 0 : '10%',
    backgroundColor: '#ffffff',
  },
  
  // Body Containers (Right Ad Space (Web Only) and Main Container)
  rightContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    
    //Temp for Visibility
    backgroundColor: '#E5E7EB',

    // Temp for Text Viewing
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
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
    backgroundColor: "#D4D4D4",
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right rounded only on Web when screen is big.
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 15 : 0,
  },
  // Contains Filter box, buttons, ect.
  listControlContainer: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    justifyContent: 'center',
    alignItems: 'center',

    // Top Right only rounded when on IOS or Screen is small
    borderTopRightRadius: (Platform.OS !== 'ios' && Platform.OS !== 'android') && windowWidth >= screenChangePoint ? 0 : 15,
    borderTopLeftRadius: 15,
  },

  // Temp
  textColor: {
    color: '#1F2937',
  },
  listTextColor: {
    color: '#ffffff',
  },
  listItemContainer: {
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 75,
    marginVertical: 10,
    backgroundColor: "#1f2937",
    borderRadius: 15,
  },
  flatList: {
    width: '100%',
    padding: 15,
  }
})