const User = require('../models/user');
const UserAuth = require('../models/userAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const secret = 'verySecureSECRET';
const expiry = '3600';
const salt = 10;
const validator = require('validator')

const createToken = (response)=>{
    return jwt.sign({
        id:response._id,
        username:response.username,
        firstName:response.firstName,
        lastName:response.lastName},
        process.env.SECRET,
        { expiresIn: '2h'}
    )
}

const registerUser = async(req, res) => {
    const {email, username, firstName, lastName, password:plainTextPassword} = req.body

    //check if a user with username is already registered
    try{
         //validation
        if(!username || !email || !plainTextPassword) {
            throw Error('All fields must be filled')
        }
        if(!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
        if(!validator.isStrongPassword(plainTextPassword)) {
            throw Error('Password not strong enough')
        }


        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'A user with this email already exists.'})
        }

        //encrypt password to store in db
        const password = await bcrypt.hash(plainTextPassword, salt)
        try{
            const user = await User.create({
                username,
                firstName,
                lastName,
                password
            })
            token = createToken(user)
            return res.status(200).json({message:'User regisration successful', user, token})
        }catch(err){
            return res.status(500).json({error:err.message})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message})
    }
}

// const userLogin = async(req,res) => {
//     const{username, password} = req.body
//     try{
//         const user = await User.findOne({username:username}).lean()
//         if(!user){
//             return res.status(401).json({message:'user not found'})
//         }
//         if(await bcrypt.compare(password, user.password)){
//             //create a JWT token
//             token = token = createToken(user)
//             return res.status(200).json({user,token})
//         }
//         return res.status(500).json({ error: 'invalid password'})
//     }catch(err) {
//         console.log(err)
//         return {status:'error', error:'timed out'}
//     }
// }

const userLogin = async (req,res) =>{
    const {username, password} = req.body
    try{
        const user = await User.findOne({username:username}).lean()
         if(!user){
            console.log('user not found')
            return res.status(401).json({message:'user not found'})
         }
        if(await bcrypt.compare(password, user.password)){
            console.log('compare pass...')
            //create a JWT token
            token = createToken(user)
            console.log('loggin in...', token)
            return res.status(200).json({user,token})
        }
        return res.status(500).json({ error: 'invalid password'})
        //const user = await User.login(username, password)

        //create a login token
        // const token = createToken(user)
        // res.status(200).json({user, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const checkSignUp = async (req, res) => {
    const {username, firstName, lastName, email, password:plainTextPassword} = req.body
    const password = await bcrypt.hash(plainTextPassword, salt)
    console.log(username, email)
    try{
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password
        })
        res.status(200).json({message: 'hitting from controller',user})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const getUsers = async(req, res) => {
    try{
        User.find({}).then(users => res.send(users))
    }catch(err){
        res.status(400).send({error: err.message})
    }
}

const getAllWorkouts = async(req,res)=>{
    try{
        Workout.find({}).then(workouts => res.send(workouts))
    }catch(error){
        res.status(400).send({error: error.message})
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

// const login = async (res,res) => {
//     const{username, password} = req.body

//     const response = await userLogin(username, password)
//     if(response.status === 200){

//     }
// }

module.exports = {
    registerUser,
    userLogin,
    checkSignUp,
    getUsers,
    newSignUp,
    newLogin
}
