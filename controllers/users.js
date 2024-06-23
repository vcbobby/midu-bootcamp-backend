const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (req, res) => {
    const { body } = req
    const { username, name, password } = body

    const user = new User({
        name,
        username,
        passwordHash: password,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter
