const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../models/Note')

const api = supertest(app)

const initialNotes = [
    {
        title: 'Titulo1 nota inicial para test',
        body: 'Body1 nota inicial para test',
    },
    {
        title: 'Titulo2 nota inicial para test',
        body: 'Body2 nota inicial para test',
    },
]
beforeEach(async () => {
    await Note.deleteMany({})
    const nota1 = new Note(initialNotes[0])
    await nota1.save()
    const nota2 = new Note(initialNotes[1])
    await nota2.save()
})

describe('Test path api/notes', () => {
    test('Notes as beeing returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two notes', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(initialNotes.length)
    })

    test('One note is about the first title', async () => {
        const response = await api.get('/api/notes')

        const titles = response.body.map((note) => note.title)
        expect(titles).toContain('Titulo1 nota inicial para test')
    })

    test('A valid note can be added', async () => {
        const newNote = {
            title: 'Probando enviar una nota',
            body: 'Test del post del backend',
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/notes')

        const titles = response.body.map((note) => note.title)
        expect(response.body).toHaveLength(initialNotes.length + 1)
        expect(titles).toContain(newNote.title)
    })

    test('An empty note can not be added', async () => {
        const newNote = {
            body: 'Test del post del backend',
        }

        await api.post('/api/notes').send(newNote).expect(400)

        const response = await api.get('/api/notes')

        expect(response.body).toHaveLength(initialNotes.length)
    })
})

describe('Test path api/notes/:id', () => {
    test('Get a note by its id', async () => {
        const noteData = {
            title: 'note by id',
            body: 'note by id body',
        }

        // Crear una nueva nota y obtener su ID
        const postResponse = await api
            .post('/api/notes')
            .send(noteData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const createdNote = postResponse.body

        // Obtener la nota por su ID
        const getResponse = await api
            .get(`/api/notes/${createdNote.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const fetchedNote = getResponse.body

        // Verificar que la nota obtenida tenga el título correcto
        expect(fetchedNote.title).toBe(noteData.title)
        expect(fetchedNote.body).toBe(noteData.body)
    })

    test('Modify a note by its id', async () => {
        const noteData = {
            title: 'note by id for put',
            body: 'note by id body for put',
        }

        // Crear una nueva nota y obtener su ID
        const postResponse = await api
            .post('/api/notes')
            .send(noteData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const createdNote = postResponse.body

        // Datos actualizados para la nota
        const updatedNoteData = {
            title: 'updated note title',
            body: 'updated note body',
        }

        // Modificar la nota por su ID
        await api
            .put(`/api/notes/${createdNote.id}`)
            .send(updatedNoteData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Obtener la nota modificada por su ID
        const getResponse = await api
            .get(`/api/notes/${createdNote.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const fetchedNote = getResponse.body

        // Verificar que la nota obtenida tenga los datos actualizados
        expect(fetchedNote.title).toBe(updatedNoteData.title)
        expect(fetchedNote.body).toBe(updatedNoteData.body)
    })

    test('Delete a note by its id', async () => {
        const noteData = {
            title: 'note by id for delete',
            body: 'note by id body for delete',
        }

        // Crear una nueva nota y obtener su ID
        const postResponse = await api
            .post('/api/notes')
            .send(noteData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const createdNote = postResponse.body

        // Borrar la nota por su ID
        await api.delete(`/api/notes/${createdNote.id}`).expect(204)

        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(initialNotes.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
