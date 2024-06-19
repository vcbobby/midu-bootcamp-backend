require('dotenv').config()
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
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    const { id } = req.params
    Note.findById(id)
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            next(err)
        })
})

app.delete('/api/notes/:id', (req, res, next) => {
    const { id } = req.params
    Note.findByIdAndRemove(id)
        .then((result) => {
            res.status(204).end()
        })
        .catch((err) => {
            next(err)
        })
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    if (!note || !note.title || !note.body) {
        res.status(400).json({
            error: 'The content of note is incomplete',
        })
    }

    const newNote = new Note({
        title: note.title,
        body: note.body,
    })
    newNote.save().then((savedNote) => {
        res.json(savedNote)
    })
})

app.use((err, req, res, next) => {
    if (err.name === 'CastError') {
        res.status(400).json({
            error: 'Id is malformed',
        })
    } else {
        res.status(500).end()
    }
})

module.exports = app
