import { useState } from 'react'

const App = () => {
  // States
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  // Functions
  const handleInput = event => setNewName(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const newPerson = {
      name: newName,
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  // Return
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    </div>
  )
}

export default App