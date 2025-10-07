import { useEffect, useState } from 'react'
import Form from './components/Form'
import Result from './components/Result'
import countryService from './services/countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [input, setInput] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    countryService
      .getList()
      .then(list => {
        setAllCountries(list)
        setSearchResult(list)
      })
  }, [])

  const handleInput = event => {
    const value = event.target.value
    setInput(value)

    const filteredList = allCountries.filter(country => 
      country.toLowerCase().includes(value.toLowerCase()))
    const findCountry = filteredList.find(country => 
      country.toLowerCase() === value.toLowerCase())
    if (findCountry === undefined) {
      setSearchResult(filteredList)
    } else {
      setSearchResult([ findCountry ])
    }
  }

  return (
    <>
      <Form value={input} onChange={handleInput} />
      <Result list={searchResult} />
    </>
  )
}

export default App
