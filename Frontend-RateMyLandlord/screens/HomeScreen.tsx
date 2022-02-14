/*
  Author: Hayden Stegman
*/
import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

/*
  Home Screen
*/
const HomeScreen = () => {
  // const navigation = useNavigation<HomeScreenProp>()
  
  return (
    <>
      <View style={styles.headerScreen}><Text style={styles.textColor}>HEADER</Text></View>
      <View style={styles.bodyScreen}>
        <View style={styles.leftContainer}>
          <Text style={styles.textColor}>LEFT</Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.textColor}>CENTER</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.textColor}>RIGHT</Text>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerScreen: {
    flex: 1,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyScreen: {
    flex: 10,
    flexDirection: "row",
    padding: 20,
    backgroundColor: '#ffffff',
  },
  
  // Body Containers
  leftContainer: {
    flex: 1,
    backgroundColor: '#60acdb',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    backgroundColor: 'red',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    backgroundColor: '#9ca3af',
    flex:2,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    color: '#ffffff',
  }
})