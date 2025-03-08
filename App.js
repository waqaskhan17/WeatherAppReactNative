
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

export default function App() {
  const [enteredCity, setEnteredCity] = useState("");
  function enteredCityName(cityName) {
    console.log(cityName);
    setEnteredCity(cityName);
  }
  const [backgroundImg, setBackgroundImg] = useState("");
  function backgroundHandler(background) {
    setBackgroundImg(background);
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode='cover' style={styles.container}>

        <SearchBar cityName={enteredCityName} />
        <Weather searchCity={enteredCity} background={backgroundHandler} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get("screen").width
  },
});
