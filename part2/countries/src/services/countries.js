import axios from "axios";

const url = 'https://studies.cs.helsinki.fi/restcountries/api'
const countryList = '../../countries.json'

const getList = () => axios
    .get(countryList)
    .then(response => 
        response.data.countries
    )

const getCountry = country => axios
    .get(`${url}/name/${country}`)
    .then(response => response.data)

export default { getList, getCountry }