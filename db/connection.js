const mysql = require('mysql2');

require('dotenv').config()

// Create connection to our database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: 'employee_tracker_db'
    }, 
    console.log('Connected to the Employee Tracker Database!')
);

sayHi = () => {
    console.log(".----------------------------------------------------------.")
    console.log("|                                                          |")
    console.log("|          _             _       ._______________.         |")
    console.log("|         | |           | |      |_______________|         |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |___________| |            |  |                |")
    console.log("|         | |___________| |            |  |                |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |           | |            |  |                |")
    console.log("|         | |           | |     .______|  |______.         |")
    console.log("|         |_|           |_|     |________________|         |")
    console.log("|                                                          |")
    console.log("|                                                          |")
    console.log(".----------------------------------------------------------.")
};

sayHi();
module.exports = connection;