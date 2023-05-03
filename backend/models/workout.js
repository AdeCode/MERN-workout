const mongoose = require('mongoose');
const Schema = mongoose.Schema

//create workoout model & schema
const WorkoutSchema = new Schema({
    title:{
        type:String,
        required:[true, 'workout name is required']
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    }
}, {timestamps:true})

const Workout = mongoose.model('workout',WorkoutSchema)
module.exports = Workout