import { useState } from 'react'

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

const FilterNumbers = ({ persons, filter }) => {
  if (filter === '') {
    return <Numbers persons={persons} />
  }
  return <Numbers persons={persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )} />
}

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
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input 
            value={newFilter}
            onChange={handleFilterInput}
          />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameInput}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <FilterNumbers persons={persons} filter={newFilter} />
    </div>
  )
}

export default App