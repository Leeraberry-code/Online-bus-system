const express = require('express');
const cors = require('cors');
//const routes = require('../server/routes'); // Import routes

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Online Bus System");
});


//app.use('/api', routes); // Example route registration

module.exports = app; 