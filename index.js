const app = require('./app');

const parentRoutes = require('./routes/parentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const learnerRoutes = require('./routes/learnerRoutes');


require('./config/db')
const port = 5000;

app.get('/',(req,res)=>{
    res.send("Welcome the Online bus system");
})

//Routes
app.use('/parent',parentRoutes);
app.use('/admin',adminRoutes);
app.use('/learner',learnerRoutes);



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
