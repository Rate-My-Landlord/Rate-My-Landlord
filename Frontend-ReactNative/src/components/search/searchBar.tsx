// SearchBar.js
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Text, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useSearchContext } from "../../global/searchContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavParamList } from "../../../App";
import { ThemeColors } from "../../constants/Colors";
import { isNumberKey } from "../../utils";

const SearchBar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParamList>>()

  const [clicked, setClicked] = useState<boolean>(false);
  const { zipCode, setZipCode, searchTerm, setSearchTerm } = useSearchContext();
  const [changeZipCode, setChangeZipCode] = useState<boolean>(false);
  const [newZip, setNewZip] = useState<string>('');

  useEffect(() => setNewZip(zipCode), [zipCode])

  const handleSubmit = () => {
    navigation.navigate("SearchResults");
  }

  const handleNewZip = () => {
    if (newZip.length === 5) {
      setZipCode(newZip);
    }
    setChangeZipCode(false);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.zipCodeContainer}>
        {changeZipCode ?
          <TextInput
            style={styles.changeZip}
            keyboardType="numeric"
            maxLength={5}
            value={newZip}
            onKeyPress={isNumberKey}
            onChangeText={(e) => { setNewZip(e) }}
            onBlur={handleNewZip}
            onSubmitEditing={handleNewZip}
          />
          :
          <TouchableOpacity onPress={() => setChangeZipCode(true)}>
            <Text style={styles.headerText} >{zipCode}</Text>
            <Text>Change</Text>
          </TouchableOpacity>
        }
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
          onFocus={() => setClicked(true)}
          onBlur={() => setClicked(false)}
          onSubmitEditing={handleSubmit}
        />
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => { setSearchTerm('') }} />
        )}
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Feather name="search" size={20} color="white" style={{ marginLeft: 1 }} />
      </TouchableOpacity>

    </View >
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    flex: 1,
  },
  submit: {
    backgroundColor: ThemeColors.blue,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    padding: 12,
  },
  headerText: {
    color: ThemeColors.blue,
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: "BebasNeue-Regular",
    lineHeight: 25,
  },
  zipCodeContainer: {
    width: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  changeZip: {
    flex: 1,
    borderColor: ThemeColors.darkBlue,
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    textAlign: 'center'
  }
});