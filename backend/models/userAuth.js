const mongoose = require('mongoose');
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt');


//create workoout model & schema
const authSchema = new Schema({
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

authSchema.statics.signUp = async function (email, password, firstName, lastName, username){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email alreadyin use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash, firstName, lastName, username})
    console.log(user)
    return user
}

authSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorect password')
    }
    return user
}

const Auth = mongoose.model('Auth',authSchema)
module.exports = Auth