const mongoose = require('mongoose');
const Schema = mongoose.Schema

//create workoout model & schema
const userSchema = new Schema({
    username:{
        type:String,
        required:[true, 'username is required']
    },
    firstName:{
        type:String,
        required:[true, 'first name is required']
    },
    lastName:{
        type:String,
        required:[true, 'last name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    }
}, {timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User