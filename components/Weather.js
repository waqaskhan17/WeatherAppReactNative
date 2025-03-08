import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from '../assets/backgrounds/index';

const API_KEY = "0554e838b31b2b11192078551ebd86ff";
const Weather = (props) => {
    //snow <FontAwesome name="snowflake-o" size={24} color="black" />
    //rain <FontAwesome name="tint" size={24} color="black" />
    //clouds <FontAwesome name="cloud" size={24} color="black" />
    //clear <FontAwesome name="sun-o" size={24} color="black" />
    //thunderstorm <Fontisto name="thunder-cloud" size={24} color="black" />
    //haze <Fontisto name="day-haze" size={24} color="black" />

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState(null);
    const [background, setBackground] = useState(null);
    async function getWeatherData(cityName) {
        setLoading(true);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        let response = await fetch(API);
        if (response.status == 200) {
            response = await response.json();
            setWeatherData(response);
        }
        else {
            setWeatherData(null);
        }
        setLoading(false);
    }
    useEffect(() => {
        getWeatherData(props.searchCity);


        const iconObj = {
            "snow": <FontAwesome name="snowflake-o" size={48} color="white" />,
            "rain": <FontAwesome name="tint" size={48} color="white" />,
            "clouds": <FontAwesome name="cloud" size={48} color="white" />,
            "clear": <FontAwesome name="sun-o" size={48} color="white" />,
            "thunderstorm": <Fontisto name="thunder-cloud" size={48} color="white" />,
            "haze": <Fontisto name="day-haze" size={48} color="white" />
        }

        if (weatherData !== null) {
            const now = new Date();
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            const isDay = now > sunrise && now < sunset;
            switch (weatherData.weather[0].main) {
                case "Snow":
                    setIcon(iconObj.snow);
                    isDay ? setBackground(snow_day) : setBackground(snow_night);
                    break;
                case "Rain":
                    setIcon(iconObj.rain);
                    isDay ? setBackground(rain_day) : setBackground(rain_night);
                    break;
                case "Clouds":
                    setIcon(iconObj.clouds);
                    isDay ? setBackground(cloud_day) : setBackground(cloud_night);
                    break;
                case "Clear":
                    setIcon(iconObj.clear);
                    isDay ? setBackground(clear_day) : setBackground(clear_night);
                    break;
                case "Thunderstorm":
                    setIcon(iconObj.thunderstorm);
                    isDay ? setBackground(rain_day) : setBackground(rain_night);
                    break;
                case "Haze":
                    setIcon(iconObj.haze);
                    isDay ? setBackground(haze_day) : setBackground(haze_night);
                    break;
                default:
                    setIcon(null);
            }

            props.background(background)
        }
    }, [props.searchCity]);

    function naiveRound(num, decimalPlaces = 0) {
        var p = Math.pow(10, decimalPlaces);
        return Math.round(num * p) / p;
    }

    if (loading) {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        );
    }
    else if (weatherData === null) {
        return (
            <View>
                <Text style={{ fontSize: 24, color: 'red' }}>Enter city name correctly.</Text>
            </View>
        );
    }
    else {

        return (
            <View>
                <View style={styles.background}></View>
                <Text style={styles.degree}>{naiveRound(weatherData.main.temp)}°C</Text>
                <Text style={styles.cityName}>{weatherData.name}, {weatherData.sys.country}</Text>
                <View style={styles.icon}>
                    <View style={styles.tempDets}>
                        <Text style={styles.inner}>Feels like: {naiveRound(weatherData.main.feels_like)}</Text>
                        <Text style={styles.inner}>Humidity: {weatherData.main.humidity}%</Text>
                        <Text style={styles.inner}>Wind: {naiveRound(weatherData.wind.speed)} km/h</Text>
                    </View>
                    <View>
                        <Text>{icon}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default Weather;
const styles = StyleSheet.create({
    degree: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: '30%',
        color: 'white'
    },
    background: {
        backgroundColor: 'black',
        width: '90%',
        height: 150,
        position: 'absolute',
        top: 110,
        opacity: 0.5,
        borderRadius: 10
    },
    cityName: {
        fontSize: 30,
        textAlign: "center",
        color: 'white'
    },
    tempDets: {
        backgroundColor: 'black',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    },
    inner: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    feelslike: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    humidity: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    wind: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    icon: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: Dimensions.get("screen").width - 50,
        alignItems: "center",
        marginTop: 20,
        height: '50%'
    }
});