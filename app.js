const express = require('express')
const app = express()
const port = process.env.PORT 
const notFound = require('./middlewares/notFound')
const errorHeandler = require('./middlewares/errorsHandler') 
const moviesRouter = require('./routers/moviesRouter')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/movies', moviesRouter)

app.use(errorHeandler)

app.use(notFound)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})