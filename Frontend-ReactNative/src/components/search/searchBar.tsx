// SearchBar.js
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Text, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useSearchContext } from "../../global/searchContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavParamList } from "../../../App";
import { ThemeColors } from "../../constants/Colors";

const SearchBar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavParamList>>()

  const [clicked, setClicked] = useState<Boolean>(false);
  const { zipCode, searchTerm, setSearchTerm } = useSearchContext();

  const handleSubmit = () => {
    navigation.navigate("SearchResults");
  }


  return (
    <View style={styles.container}>
      <View
        style={
          !clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Text>{zipCode}</Text>

        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => { setSearchTerm('') }} />
        )}
        {/* cancel button, depending on whether the search bar is clicked or not */}
        {clicked && (
          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text>Go</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  submit: {
  }
});