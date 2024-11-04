const express = require('express');
const cors = require('cors');
//const routes = require('../server/routes'); // Import routes

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true, 
  };
  
  app.use(express.json());
  app.use(cors(corsOptions));
// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Online Bus System");
});


//app.use('/api', routes); // Example route registration

module.exports = app; 