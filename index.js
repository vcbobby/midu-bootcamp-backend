const app = require('./api/app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = (req, res) => {
    app(req, res)
}
