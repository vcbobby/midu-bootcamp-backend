const mongoose = require('mongoose')
const connectionString =
    'mongodb+srv://castillo:vcbobby@cluster0.ysdavgh.mongodb.net/app?retryWrites=true&w=majority&appName=app'

//conexion a mongoDB

mongoose
    .connect(connectionString)
    .then(() => {
        console.log('todo ok')
    })
    .catch((error) => {
        console.error(error)
    })
