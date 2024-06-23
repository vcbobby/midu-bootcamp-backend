const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (req, res) => {
    const { body } = req
    const { username, name, password } = body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        username,
        passwordHash,
    })

    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = usersRouter
