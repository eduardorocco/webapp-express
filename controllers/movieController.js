const connection = require('../data/db')

function index(req, res) {
    const sql = `SELECT * FROM movies`
    connection.query(sql,(err, movies) => {
        if(err) {
            res.send('Error')
        } else {
            res.json(movies)
        }
    })}

function show(req, res) {
res.send('Show movies')
}

module.exports = { index, show }