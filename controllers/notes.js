const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/', async (req, res, next) => {
    try {
        const notes = await Note.find({})
        res.json(notes)
    } catch (err) {
        next(err)
    }
})

notesRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params

    try {
        const note = await Note.findById(id)
        if (note) {
            res.json(note)
        } else {
            res.status(404).end() // Respond with 404 if note not found
        }
    } catch (err) {
        next(err)
    }
})

notesRouter.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const note = req.body
    const newNoteInfo = {
        title: note.title,
        body: note.body,
    }

    try {
        const note = await Note.findByIdAndUpdate(id, newNoteInfo, {
            new: true,
        })
        res.json(note)
    } catch (err) {
        next(err)
    }
})

notesRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params

    try {
        const note = await Note.findByIdAndDelete(id)
        if (note) {
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'Note not found' })
        }
    } catch (err) {
        next(err)
    }
})

notesRouter.post('/', async (req, res, next) => {
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

    try {
        const noteToAdd = await newNote.save()
        res.json(noteToAdd)
    } catch (err) {
        next(err)
    }
})

module.exports = notesRouter
