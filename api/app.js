require('dotenv').config()
require('../mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('../models/Note')
const notFound = require('../middlewares/notFound')
const error = require('../middlewares/error')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Backend de app de notas bootcamp midudev</h1>')
})

app.get('/api/notes', (req, res, next) => {
    Note.find({})
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            next(err)
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

app.put('/api/notes/:id', (req, res, next) => {
    const { id } = req.params
    const note = req.body
    const newNoteInfo = {
        title: note.title,
        body: note.body,
    }
    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            next(err)
        })
})
app.delete('/api/notes/:id', (req, res, next) => {
    const { id } = req.params

    Note.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.status(204).end()
            } else {
                res.status(404).json({ error: 'Note not found' })
            }
        })
        .catch((err) => {
            next(err)
        })
})

app.post('/api/notes', (req, res, next) => {
    const note = req.body

    if (!note || !note.title || !note.body) {
        return res.status(400).json({
            error: 'The content of note is incomplete',
        })
    }

    const newNote = new Note({
        title: note.title,
        body: note.body,
    })
    newNote
        .save()
        .then((savedNote) => {
            res.json(savedNote)
        })
        .catch((err) => {
            next(err)
        })
})
app.use(notFound)

app.use(error)

module.exports = app
