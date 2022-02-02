const mysql = require('mysql2');

require('dotenv').config();

// Create connection to our database
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_NAME,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = connection;