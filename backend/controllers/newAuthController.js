const User = require('../models/user');
const UserAuth = require('../models/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const secret = 'verySecureSECRET';
const expiry = '3600';
const salt = 10;
const validator = require('validator')

const createToken = (_id)=>{
    return jwt.sign({
        id:response._id,
        username:response.username,
        firstName:response.firstName,
        lastName:response.lastName},
        process.env.SECRET,
        { expiresIn: '2h'}
    )
}



const getUsers = async(req, res) => {
    try{
        User.find({}).then(users => res.send(users))
    }catch(err){
        res.status(400).send({error: err.message})
    }
}

const newSignUp = async(req, res) => {
    const {email, password, firstName, lastName, username} = req.body
    try{
        const user = await UserAuth.signUp(email, password, firstName, lastName, username)
        res.status(200).json({email, user})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const newLogin = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await UserAuth.login(email, password)
        token = createToken(user)
        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}


module.exports = {
    getUsers,
    newSignUp,
    newLogin
}
