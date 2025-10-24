const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject = ({
            id: returnedObject._id.toString(),
            ...returnedObject
        })

        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        
        return returnedObject
    }
})

module.exports = mongoose.model('User', userSchema)