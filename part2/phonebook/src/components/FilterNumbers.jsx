const Numbers = ({ persons }) => (
    <div>
        {persons.map(person =>
            <div key={person.name}>
                {person.name} {person.number}
            </div>
        )}
    </div>
)

const FilterNumbers = ({ persons, filter }) => (
  <Numbers persons={persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )} />
)

export default FilterNumbers