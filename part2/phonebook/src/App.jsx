import { useEffect, useState } from 'react'
import FilterNumbers from './components/FilterNumbers'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  // State hooks
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  // Effect hook: Get persons from server
  useEffect(() => {
    personService
      .get()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  // Functions
  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)
  const handleFilterInput = event => setNewFilter(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName) === undefined) {
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
    } 
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  // Return
  return (
    <>
      <h2>Phonebook</h2>
      <FilterForm
        value={newFilter} 
        onChange={handleFilterInput} 
      />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={handleSubmit}
        name={{ value: newName, onChange: handleNameInput }}
        number={{ value: newNumber, onChange: handleNumberInput }}
      />

      <h3>Numbers</h3>
      <FilterNumbers
        persons={persons}
        filter={newFilter}
      />
    </>
  )
}

export default App