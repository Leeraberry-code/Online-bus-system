const app = require('./app');
const express = require('express');
const session = require('express-session');
 require('dotenv').config();
const parentRoutes = require('./routes/parentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
const busRoutes = require('./routes/busRoutes');
const loginRoutes = require('./routes/loginRoute');

app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));


require('./config/db')
const port = 5000;

app.get('/',(req,res)=>{
    res.send("Welcome the Online bus system");
})

//Routes
app.use('/parent',parentRoutes);
app.use('/admin',adminRoutes);
app.use('/learner',learnerRoutes);
app.use('/bus',busRoutes);
app.use('/login',loginRoutes);


require('./config/db')



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
