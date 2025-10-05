import { useState } from 'react'
import FilterNumbers from './components/FilterNumbers'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'

const App = () => {
  // States
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  // Functions
  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)
  const handleFilterInput = event => setNewFilter(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName) === undefined) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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