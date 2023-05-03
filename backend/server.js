require('dotenv').config()
const express = require('express')
const routes = require('./routes/workouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connectDB = require('./db')
var cors = require('cors')


//express app
const app = express()

//handling CORS
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}
));

//connect to database
connectDB()

// mongoose.connect(process.env.DB_URI)
//     .then(()=>{
//         app.listen(process.env.PORT, ()=>{
//             console.log('connected to db & listening on port'+process.env.PORT)
//         })
//     })
//     .catch(err => {
//         console.log(err)
//     })

mongoose.Promise = global.Promise

app.use(bodyParser.json())

//middleware
app.use((req,res,next)=>{
    next()
})

app.use('/api', routes)

//listen for request
app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+process.env.PORT)
})