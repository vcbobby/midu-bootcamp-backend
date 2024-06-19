const { model, Schema } = require('mongoose')
const noteSchema = new Schema({
    title: String,
    body: String,
})

noteSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
    },
})

const Note = model('Note', noteSchema)

module.exports = Note

// const note = new Note({
//     title: 'Victor llegaras bien lejos',
//     body: 'solo sigue dandole el pecho',
// })

// note.save()
//     .then((result) => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch((error) => {
//         console.error(error)
//     })
