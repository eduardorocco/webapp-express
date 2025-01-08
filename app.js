const express = require('express')
const app = express()
const port = 3000
const notFound = require('./middlewares/notFound')
const errorHeandler = require('./middlewares/errorHandler') 

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(errorHeandler)

app.use(notFound)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})