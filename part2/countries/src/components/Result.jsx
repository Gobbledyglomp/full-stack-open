import { useEffect, useState } from 'react'
import CountryInfo from './CountryInfo'
import ListResult from './ListResult'
import countryService from '../services/countries'

const Result = ({ list, onShowClick }) => {
    const [currentCountry, setCurrentCountry]  =  useState(null)
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        if (currentCountry !== null) {
            countryService
                .getCountry(currentCountry)
                .then(data => setCountryData(data))
        }
    }, [currentCountry])

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
    } 

    if (currentCountry !== list[0]) {
        setCurrentCountry(list[0])
    }

    if (countryData !== null && countryData.name.common === currentCountry) {
        return (
            <CountryInfo data={countryData} />
        )
    }

    return (
        <div>
            Loading...
        </div>
    )
}

export default Result