const mongoose = require('mongoose')
const connectionString = process.env.MONGO_DB_URI
//conexion a mongoDB

mongoose
    .connect(connectionString)
    .then(() => {
        console.log('todo ok')
    })
    .catch((error) => {
        console.error(error)
    })
