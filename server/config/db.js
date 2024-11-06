const mysql = require('mysql2');
require('dotenv').config();


// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',        
    user: 'root',             
    password: '',             
    database: process.env.DATABASE
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
