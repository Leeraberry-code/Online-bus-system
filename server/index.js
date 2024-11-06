const express = require('express');
const cors = require('cors');
const session = require('express-session');
 require('dotenv').config();
 
const parentRoutes = require('./routes/parentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
const busRoutes = require('./routes/busRoutes');
const loginRoutes = require('./routes/loginRoute');

//const routes = require('../server/routes'); // Import routes

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the Online Bus System");
});

app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));


require('./config/db')
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Welcome the Online bus system");
})

//Routes
app.use('/parent',parentRoutes);
app.use('/admin',adminRoutes);
app.use('/learner',learnerRoutes);
app.use('/bus',busRoutes);
app.use('/login',loginRoutes);

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
