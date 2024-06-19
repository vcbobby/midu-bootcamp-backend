const { model, Schema } = require('mongoose')
const noteSchema = new Schema({
    title: String,
    body: String,
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
