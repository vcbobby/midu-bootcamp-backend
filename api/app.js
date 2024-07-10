require('dotenv').config()
require('../mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const notFound = require('../middlewares/notFound')
const error = require('../middlewares/error')
const notesRouter = require('../controllers/notes')
const usersRouter = require('../controllers/users')
const loginRouter = require('../controllers/login')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Backend de app de notas bootcamp midudev</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(notFound)

app.use(error)

module.exports = app
