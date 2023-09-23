const express = require('express') 
const router = express.Router()
const AuthController = require('../controllers/authController')
const {
    registerUser,
    checkSignUp,
    getUsers,
    newSignUp,
    newLogin
} = require('../controllers/authController')

router.post('/signup', AuthController.registerUser)
router.post('/login', AuthController.userLogin)
router.post('/checkSignUp', checkSignUp)
router.get('/users', getUsers)
router.post('/newsignUp', newSignUp)
router.post('/newlogin', newLogin)


router.post('/userSIgnUp', (req, res) => {
    const {username, email} = req.body
    console.log('signing up', username, email)
    res.json({message: `${email} ${username} trying to sign up`})
})

module.exports = router