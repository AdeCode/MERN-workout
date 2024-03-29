const mongoose = require('mongoose');
require('dotenv').config();
const {DB_URI} = process.env
console.log(DB_URI)
const ATLAS_URI = `${DB_URI}`

//Async mongoose conn
const connectDB = async () => {
    console.log('trying to connect')
    try {
        await mongoose.connect(ATLAS_URI, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('MongoDB connected')
        //seed data
        
    } catch (error) {
        console.error(error.message)
        //exit with failure
        process.exit(1)
    }
}

module.exports = connectDB;