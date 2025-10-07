import axios from "axios";

const country_list = '../../countries.json'
const countries_api_url = 'https://studies.cs.helsinki.fi/restcountries/api'
const weather_api_url = 'https://api.openweathermap.org/data/2.5'
const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY

const getList = () => axios
    .get(country_list)
    .then(response => response.data.countries)

const getCountry = country => axios
    .get(`${countries_api_url}/name/${country}`)
    .then(response => response.data)

const getWeather = coords => axios
    .get(`${weather_api_url}/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${weather_api_key}`)
    .then(response => response.data)

export default { getList, getCountry, getWeather }