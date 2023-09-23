require('dotenv').config()
const express = require('express')
const routes = require('./routes/workouts')
const authRoutes = require('./routes/authRoutes')

const mongoose = require('mongoose')
const connectDB = require('./db')
var cors = require('cors')


//express app
const app = express()

app.use(express.json())


//handling CORS
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}
));

//connect to database
connectDB()

//middleware
app.use((req,res,next)=>{
    next()
})


app.use('/api', routes)
// app.use('/api', routes)
app.use('/api/auth', authRoutes)

//listen for request
app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+process.env.PORT)
})