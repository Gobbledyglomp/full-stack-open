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

    const duplicate = persons.find(person => person.name === newName)
    if (duplicate === undefined) {
      personService
        .create(newPerson)
        .then(added => {
          setPersons(persons.concat(added))
          setNewName('')
          setNewNumber('')
        })
    } 
    else {
      const canChange = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (canChange) {
        newPerson.id = duplicate.id

        personService
          .update(newPerson)
          .then(updated => {
            setPersons(persons.map(person => 
              person.id === updated.id
                ? updated
                : person
            ))
          })
      }
    }
  }

  const handleDeletion = (event, person) => {
    event.preventDefault()

    const canDelete = confirm(`Delete ${person.name}?`)
    if (canDelete) {
      personService
        .remove(person)
        .then(deleted => {
          setPersons(persons.filter(person => person.id !== deleted.id))
        })
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
        onDelete={handleDeletion}
      />
    </>
  )
}

export default App