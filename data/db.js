const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Barcellona2019',
    database:'movies_db'
})

connection.connect((err) => {
    if(err){
        console.log(err)
    }else{
        console.log('Database connected')
    }
})

module.exports = connection