const { ObjectId } = require('mongodb')
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    name: String,
    username: String,
    passwordHash: String,
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note',
        },
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.passwordHash
    },
})

const User = model('User', userSchema)

module.exports = User
