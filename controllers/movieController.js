const connection = require('../data/db')

function index(req, res) {
    const sql = `SELECT * FROM movies`
    connection.query(sql, (err, movies) => {
        if (err) {
            res.send('Error')
        }
    })
    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message })
        movies.forEach(movie => {
            movie.image = `http://localhost:3000/movies_cover/${movie.image}`
        })
        res.json(movies)
    })
}

function show(req, res) {
    
    const id = req.params.id
    

    const sql = `SELECT movies.*, AVG(vote) AS avg_vote 
		FROM movies
		JOIN reviews
		ON movies.id = reviews.movie_id 
		WHERE movies.id = ?
		GROUP BY movies.id
    `

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Movie not found',
            })

        const movie = results[0]
        movie.image = `http://localhost:3000/movies_cover/${movie.image}`

        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results
            res.json(movie)
        })

    })
}

function storeReview(req, res) {

    const movie_id = req.params.id
    const { name, vote, text } = req.body
    const intVote = parseInt(vote)

    if (
        !name ||
        !vote ||
        isNaN(intVote) ||
        intVote < 0 ||
        intVote > 5 ||
        name?.length > 255 ||
        typeof text !== 'string'
    ){
        return res.status(400).json({ message: 'Invalid data' })
    }

    const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`

    connection.query(sql, [movie_id, name, intVote, text], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        res.status(201).json({ message: 'Review created' })
    })
}


module.exports = { index, show, storeReview }