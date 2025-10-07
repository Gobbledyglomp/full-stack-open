import { useEffect, useState } from 'react'
import Form from './components/Form'
import Result from './components/Result'
import countryService from './services/countries'

function App() {
  //
  // State hooks
  //
  const [allCountries, setAllCountries] = useState([])
  const [input, setInput] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  //
  // Effect hooks
  //
  useEffect(() => {
    countryService
      .getList()
      .then(list => {
        setAllCountries(list)
        setSearchResult(list)
      })
  }, [])

  //
  // Functions
  //
  const findCountries = input => {
    const filteredList = allCountries.filter(country => 
      country.toLowerCase().includes(input.toLowerCase()))
    const findCountry = filteredList.find(country => 
      country.toLowerCase() === input.toLowerCase())
    if (findCountry === undefined) {
      setSearchResult(filteredList)
    } else {
      setSearchResult([ findCountry ])
    }
  }

  //
  // Handlers
  //
  const handleInput = event => {
    setInput(event.target.value)
    findCountries(event.target.value)
  }
  const handleShowClick = (event, country) => {
      event.preventDefault()
      setInput(country)
      findCountries(country)
  }

  //
  // Render
  //  
  return (
    <>
      <Form 
        value={input} 
        onChange={handleInput} 
      />
      <Result 
        list={searchResult} 
        onShowClick={handleShowClick} 
      />
    </>
  )
}

export default App
