import { useState } from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";

import Feather from '@expo/vector-icons/Feather';
const SearchBar = (props) => {
    const [name, setName] = useState("");
    function setNameHandler(cityName) {
        // console.log(cityName);
        setName(cityName);
    }
    function cityNameEnterHandler() {
        props.cityName(name);
    }
    return (
        <View style={styles.searchBar}>
            <TextInput onChangeText={setNameHandler} placeholder="Enter Your City....." />
            <Feather name="search" size={24} color="black" onPress={cityNameEnterHandler} />
        </View>
    );
}

export default SearchBar;
const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "white",
        width: Dimensions.get("screen").width - 80,
        padding: 10,
        borderRadius: 10,
        marginTop: 200,
        backgroundColor: "#FBF8EF",
    }
});