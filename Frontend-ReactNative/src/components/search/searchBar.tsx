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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
          onFocus={() => setClicked(true)}
          onBlur={() => setClicked(false)}
        />
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => { setSearchTerm('') }} />
        )}
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Feather name="search" size={20} color="white" style={{ marginLeft: 1 }} />
      </TouchableOpacity>

    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "stretch",
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
    // Vertical: 'auto',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  }
});