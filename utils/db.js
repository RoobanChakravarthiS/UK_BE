const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Rooban@6362',
    database:'uk_db'
});

module.exports = pool;