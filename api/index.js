require('../mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('../models/Note')

app.use(cors())
app.use(express.json())

let notes = []

app.get('/', (req, res) => {
    res.send('<h1>hola como ta tu</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then((notes) => {
        res.json(
            notes.map((note) => {
                const { _id, __v, ...restOfNotes } = note
                return {
                    ...restOfNotes,
                    id: _id,
                }
            })
        )
    })
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find((note) => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter((note) => note.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    if (!note || !note.title || !note.body) {
        res.status(400).json({
            error: 'The content of note is incomplete',
        })
    }
    const ids = notes.map((note) => note.id)
    const maxId = Math.max(...ids)
    const newNote = {
        id: maxId + 1,
        userId: 1,
        title: note.title,
        body: note.body,
    }
    notes = [...notes, newNote]
    res.json(newNote)
})

app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
    })
})

module.exports = app
