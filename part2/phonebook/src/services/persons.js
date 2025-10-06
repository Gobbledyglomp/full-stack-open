import axios from "axios"
const url = 'http://localhost:3001/persons'

const get = () => axios
    .get(url)
    .then(response => response.data)
    
const create = newPerson => axios
    .post(url, newPerson)
    .then(response => response.data)

const update = newPerson => axios
    .put(`${url}/${newPerson.id}`, newPerson)
    .then(response => response.data)

const remove = person => axios
    .delete(`${url}/${person.id}`)
    .then(response => response.data)

export default { get, create, remove, update }