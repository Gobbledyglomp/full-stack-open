import { useEffect, useState } from 'react'
import CountryInfo from './CountryInfo'
import ListResult from './ListResult'
import countryService from '../services/countries'

const Result = ({ list, onShowClick }) => {
    //
    // State hooks
    //
    const [currentCountry, setCurrentCountry] = useState(null)
    const [countryData, setCountryData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    //
    // Effect hooks
    //
    useEffect(() => {
        if (currentCountry !== null) {
            countryService
                .getCountry(currentCountry)
                .then(data => {
                    setCountryData(data)
                    return data.capitalInfo.latlng
                })
                .then(coords => {
                    countryService
                        .getWeather(coords)
                        .then(data => setWeatherData(data))
                        .catch(error => console.log(error.message))
                })
                .catch(error => console.log(error.message))
        }
    }, [currentCountry])

    //
    // Conditional rendering
    //
    if (list === null || list.length > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }  else if (list.length === 0) {
        return (
            <div>
                No country was found, specify another filter.
            </div>
        )
    } else if (list.length !== 1) {
        return (
            <ListResult 
                list={list}
                onClick={onShowClick} 
            />
        )
    } else {
        if (currentCountry !== list[0]) {
            setCurrentCountry(list[0])
        }

        if (countryData !== null && countryData.name.common === currentCountry) {
            return (
                <CountryInfo 
                    countryData={countryData}
                    weatherData={weatherData}
                />
            )
        }
    }
    return (
        <div>
            Loading...
        </div>
    )
}

export default Result